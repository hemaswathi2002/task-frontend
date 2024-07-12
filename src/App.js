import {Routes,Route} from 'react-router-dom' 
import { useEffect,useReducer } from 'react';
import axios from 'axios'
import Home from "./Components/Home"
import AdminDashboard from './Components/AdminDashboard'
import RegistraionForm from './Components/RegistrationForm'
import LoginForm from './Components/LoginPage'
import CreateEmployee from './Components/CreateEmployee'
import ListEmployee from './Components/ListEmployee'
import EmployeeReducer from './Components/EmployeeReducer'
import { EmployeeContext } from './Context/EmployeeContext'
import { AuthProvider } from './Components/AuthContext';
import { useAuth } from './Components/AuthContext';
export default function App(){
  const [employee, employeeDispatch] = useReducer(EmployeeReducer,[])

  const {user} = useAuth()

  useEffect(()=>{
    (async()=>{
      try{
        const response = await axios.get('http://localhost:3000/api/employees')
        console.log(response.data)
        employeeDispatch({type:'SET_EMPLOYEES', payload: response.data})
      }
      catch(err){
        console.log(err)
      }
    })();
  },[])

  return(
    <>
    <Home/>
    <div>
      <EmployeeContext.Provider value = {{employee,employeeDispatch}}>
      <Routes>
      <Route path = '/register' element = {<RegistraionForm/>}/>
      <Route path = '/login' element = {<LoginForm/>}/>
      {user ? 
      <>
      <Route path = '/admin' element = {<AdminDashboard/>}/>
      <Route path = '/register-employee'element = {<CreateEmployee/>}/>
      <Route path = '/employee' element = {<ListEmployee/>}/>
      <Route path = '/list-employee' element = {<ListEmployee/>}/>
      </>
      : null }
      
      </Routes>
      </EmployeeContext.Provider>
    </div>
    </>
  )
}