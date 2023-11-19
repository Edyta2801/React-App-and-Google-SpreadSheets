import {useState,useEffect} from 'react'
import axios from 'axios'
import {Data} from './Components/Data'

function App() {

  // form states
  const [name, setName]=useState('');
  const [age, setAge]=useState('');
  const [destignation, setDestignation]=useState('');
  const [salary, setSalary]=useState('');

  // retrived data state
  const [data, setData]=useState([]);

  // submit event
  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(name, age, designation, salary);

    // our object to pass
    const data = {
      Name:name,
      Age:age,
      Destignation:destignation,
      Salary:salary,
    }
    axios.post('https://sheet.best/api/sheets/2cf5fbf5-0ec3-44ce-b534-21b7a58460a6',data).then(response=>{
      console.log(response);
      setName('');
      setAge('');
      setDestignation('');
      setSalary('');
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

  return (
    <div className="container">
      <br></br>
      <h1>Save Form Data in Google Sheets using React</h1>
      <br></br>
      <form autoComplete="off" className='form-group'
      onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' className='form-control' required
          placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}
          value={name}
        />
        <br></br>
        <label>Age</label>
        <input type='text' className='form-control' required
          placeholder='Enter your age' onChange={(e)=>setAge(e.target.value)}
          value={age}
        />
        <br></br>
        <label>Destignation</label>
        <input type='text' className='form-control' required
          placeholder='Enter your designation'
          onChange={(e)=>setDestignation(e.target.value)}
          value={destignation}
        />
        <br></br>
        <label>Salary</label>
        <input type='text' className='form-control' required
          placeholder='Enter your salary'
          onChange={(e)=>setSalary(e.target.value)}
          value={salary}
        />
        <br></br>
        <div style={{display:"flex",justifyContent:'flex-end'}}>
          <button type='submit' className='btn btn-primary'>Submit</button>
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
                  <th scope='col'>Name</th>
                  <th scope='col'>Age</th>
                  <th scope='col'>Destignation</th>
                  <th scope='col'>Salary</th>
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