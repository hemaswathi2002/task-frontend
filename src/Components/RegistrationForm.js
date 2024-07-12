import {useState,useEffect} from 'react'
import axios from 'axios'
export default function RegistraionForm(){
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const [serverError,setServerError] = useState([])

    const errors = {}
    const validateErrors = ()=>{
        if(username.trim().length == 0){
            errors.username = 'required!'
        }
        if(password.trim().length == 0){
            errors.password = 'required!'
        }
        setFormErrors(errors)
        return errors
    }

    const handleSubmit = async(e)=>{
        validateErrors()
        e.preventDefault()
        const formData = {
            username,
            password
        }
        try{
            if(Object.keys(errors).length ===0){
            const response = await axios.post('http://localhost:3000/api/register',formData)
            console.log(response.data)
            setServerError([])
            setFormErrors({})
            setUserName('')
            setPassword('')
            }
        }
        catch(err){
            console.log(err)
            setServerError(err.response?.data?.errors)
        }
    }

    console.log(serverError)
    console.log(formErrors)

    return(
        <>
        <h2>RegistraionForm</h2>
        <ul>
        {serverError? 
        serverError.map((ele)=>{
            return <li style = {{color: 'red'}}>{ele.msg}</li>
        }) : null}
        </ul>
        <form onSubmit = {handleSubmit}>
        <div>
            <label htmlFor="username">username</label>
            <input type = 'text'
            id = 'username'
            value = {username}
            onChange = {(e)=>setUserName(e.target.value)}
            />
        </div>
        {formErrors.username && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.username}</small>}
        <div>
            <lable htmlFor= 'password'>Password</lable>
            <input type = 'password'
            id ='password'
            value = {password}
            onChange={(e)=>setPassword(e.target.value)}
            /><br/>
        {formErrors.password && <small style={{color : 'red', fontSize: '1rem'}}>{formErrors.password}</small>}
        </div>
        <input type = 'submit'/>
        </form>
        </>

    )
}