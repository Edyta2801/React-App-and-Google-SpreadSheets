import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Data} from './Components/Data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
 
  const [data, setData]=useState([]);
  const [items, setItems] = useState([]);

  const [totalAmount, setTotalAmount] = useState(() => {
    const storedTotalAmount = localStorage.getItem("totalAmount");
    if (storedTotalAmount) {
      return parseInt(storedTotalAmount);
    }
    return 0;
  });

  const [options, setOptions] = useState(
    JSON.parse(localStorage.getItem('options')) || []
  );


  const notify = () => 
  toast.info('Wydatek został dodany!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


  const handleSubmit=(e)=>{   
    e.preventDefault();

    const amount = parseInt(e.target.elements.amount.value);
    if (isNaN(amount)) {
      return;
    }

    const newItem = { amount: amount };
    setItems([...items, newItem]);

    const updatedTotal = totalAmount + amount;
    setTotalAmount(updatedTotal);
    localStorage.setItem("totalAmount", updatedTotal.toString())


    const newOptions = [...options, expense];
    localStorage.setItem('options', JSON.stringify(newOptions));
    setOptions(newOptions);
    setExpense('');

    notify()


    const data = [{
      Category:selectedCategory,
      Expense:expense,
      Amount:amount,
    }]
   
      axios.post('https://api.steinhq.com/v1/storages/65859b6584e6cb2495518c43/Arkusz1', data).then(response=>{
  
    console.log(response);
      setSelectedCategory('');
      setExpense('');
      setAmount('');
    })
  }

  const getData=()=>{
      axios.get('https://api.steinhq.com/v1/storages/65859b6584e6cb2495518c43/Arkusz1').then((response)=>{ 
    setData(response.data);
      console.log(response.data)
    })
  }

  useEffect(()=>{
    if (data.length) return
    getData();
  },[data.length])

  return (
    <div className="container-new">
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
        <ToastContainer />
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
        <input type='text' className='form-control'  
        pattern='^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$'
        list="optionsList"
        required
          placeholder='Wydatek'
           onChange={(e)=>setExpense(e.target.value)}
          value={expense}
        />
        <datalist id="optionsList">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
        <br></br>
        <label>Kwota</label>
        <input type='number' className='form-control' name='amount'  min="1" required
          placeholder='Kwota' 
          onChange={(e)=>setAmount(e.target.value)}
          value={amount}
        />
        <br></br>
       
        <input className='check-box' type='checkbox' label='Wydatek powtarza się' 
        onChange={(e)=>(e.target.checked)}
        />
        <label>Wydatek powtarza się</label>
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