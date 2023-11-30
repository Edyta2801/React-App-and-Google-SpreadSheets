import {useState,useEffect} from 'react'
import axios from 'axios'
import {Data} from './Components/Data'

const categories = [
  {value: 'jedzenie', label:'Jedzenie'   },
  {value: 'dom', label:'Dom'},
  {value: 'zdrowie', label: 'Zdrowie'  },
  {value: 'inne', label: 'Inne'  }
];


function App() {

  // form states
  // const [expense, setExpense]=useState(0);
  const [selectedCategory, setSelectedCategory]=useState('jedzenie')
  const [expense, setExpense]=useState('');
  const [amount, setAmount]=useState('');
  const [expenseType, setExpenseType]=useState('');;

  // retrived data state
  const [data, setData]=useState([]);

  // submit event
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(name, age, designation, salary);

    // our object to pass
    const data = {
      // ExpenseValue:expense,
      Category:selectedCategory,
      Expense:expense,
      Amount:amount,
      ExpenseType:expenseType,
    }
    axios.post('https://sheet.best/api/sheets/2cf5fbf5-0ec3-44ce-b534-21b7a58460a6',data).then(response=>{
      console.log(response);
      setSelectedCategory('');
      setExpense('');
      setAmount('');
      setExpenseType('');
    })
  }

  // getting data function
  const getData=()=>{
    axios.get('https://sheet.best/api/sheets/2cf5fbf5-0ec3-44ce-b534-21b7a58460a6').then((response)=>{
      setData(response.data);
      console.log(response.data)
    })
  }

  // triggering function
  useEffect(()=>{
    if (data.length) return
    getData();
  },[])

 const expenses=15000;
const current = new Date().toLocaleDateString('pl-PL',{month:'long'});
const expense_Type={
  oneTime:'one',
  fixed:'fixed'
}

  return (
    <div className="container">
      <div className='main'>
      <br></br>
      <button type='submit' className='btn btn-primary'>{expenses}</button>
      <br></br>
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
          placeholder='Wydatek' onChange={(e)=>setExpense(e.target.value)}
          value={expense}
        />
        <br></br>
        <label>Amount</label>
        <input type='number' className='form-control' required
          placeholder='Kwota' onChange={(e)=>setAmount(e.target.value)}
          value={amount}
        />
        <br></br>
        <label>ExpenseType</label>
        <input type='text' className='form-control' required
          placeholder='Wydatek powtarza się'
          onChange={(e)=>setExpenseType(e.target.value)}
          value={expenseType}
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
                  <th scope='col'>Expense Type</th>
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