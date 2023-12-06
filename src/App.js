import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Data} from './Components/Data'

const categories = [
  {value: 'jedzenie', label:'Jedzenie'   },
  {value: 'dom', label:'Dom'},
  {value: 'zdrowie', label: 'Zdrowie'  },
  {value: 'inne', label: 'Inne'  }
];

const current = new Date().toLocaleDateString('pl-PL',{month:'long'});

function App() {

  const [selectedCategory, setSelectedCategory]=useState('jedzenie')
  const [expense, setExpense]=useState('');
  const [amount, setAmount]=useState('');
  const [repetitive, setRepetitive]=useState(false);

  const [data, setData]=useState([]);

  const key = "totalAmount";

  const [items, setItems] = useState([]);
  // const [totalAmount, setTotalAmount]=useState([0])
  // const [totalAmount, setTotalAmount]=useState(() => {
  //   const persistedValue = window.localStorage.getItem("totalAmount");
  //   return persistedValue !== null ? JSON.parse(persistedValue) : 0;
  // });

  const [totalAmount, setTotalAmount]=useState(
    localStorage.getItem('totalAmount')|| 0
  );


  useEffect(() => {
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    }, [totalAmount]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const amount = parseInt(e.target.elements.amount.value);
    if (isNaN(amount)) {
      return;
    }

    const newItem = { amount: amount };
    setItems([...items, newItem]);

    console.log(`repetitive:${repetitive}`);

    const data = {
      Category:selectedCategory,
      Expense:expense,
      Amount:amount,
      Repetitive:repetitive,
    }
    axios.post('https://sheet.best/api/sheets/2cf5fbf5-0ec3-44ce-b534-21b7a58460a6',data).then(response=>{
      console.log(response);
      setSelectedCategory('');
      setExpense('');
      setAmount('');
      setRepetitive('');
    })
  }

  const getData=()=>{
    axios.get('https://sheet.best/api/sheets/2cf5fbf5-0ec3-44ce-b534-21b7a58460a6').then((response)=>{
      setData(response.data);
      console.log(response.data)
    })
  }

  useEffect(()=>{
    if (data.length) return
    getData();
  },[])

  const updateTotalAmount = () => {
    const total = items.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    updateTotalAmount();
  }, [items]);
  
  
  useEffect(() => {
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  }, [totalAmount]);


  return (
    <div className="container">
      <div className='main'>
      <br></br>
      <button type='submit' className='btn btn-primary'>Wydatki: {totalAmount}</button>
      <br></br>
      {/* <ul>
        {items.map((item) => (
          <li key={item.amount}>{item.amount}</li>
        ))}
      </ul> */}
      <hr></hr>
      <label color='blue'style={{width:'100%', size:'huge'}}>{current}</label>
      </div>
      <form autoComplete="off" className='form-group'
      onSubmit={handleSubmit}>
           <br></br>
        <label style={{display:'block'}}>Kategoria
        <select 
      type='text' 
      className='form-control' required
        value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}>
        {categories.map(item => {
                  return (<option key={item.value} value={item.value}>{item.label}</option>);
              })}
      </select>
        </label>
        <br></br>
        <label>Wydatek</label>
        <input type='text' className='form-control' required
          placeholder='Wydatek'
           onChange={(e)=>setExpense(e.target.value)}
          value={expense}
        />
        <br></br>
        <label>Kwota</label>
        <input type='number' className='form-control' name='amount' required
          placeholder='Kwota' 
          onChange={(e)=>setAmount(e.target.value)}
          value={amount}
        />
        <br></br>
        <label>Wydatek powtarza się</label>
        <input type='checkbox' checked={repetitive} label='Wydatek powtarza się' 
        onChange={(e)=>setRepetitive(e.target.checked)}
        />
        <br></br>
        <div style={{display:"flex"}}>
          <button  style={{width:'100%'}} type='submit' className='btn btn-primary'>Submit</button>
        </div>
      </form>
      <div className='view-data'>
        {data.length<1&&<>No data to show</>}
        {data.length>0&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Index</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Expense</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Repetitive</th>
                </tr>
              </thead>
              <tbody>
                <Data data={data}/>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;