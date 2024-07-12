import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { EmployeeContext } from "../Context/EmployeeContext"
export default function CreateEmployee(props){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [designation,setDesignation] = useState('')
    const [gender,setGender] = useState('')
    const [course, setCourse] = useState([])
    const [image,setImage] = useState(null)
    const [emp, setEmp] = useState(null)
    const [serverError,setServerError] = useState([])
    const [formErrors,setFormErrors] = useState({})

    const {employee,employeeDispatch} = useContext(EmployeeContext)

    const { editId } = props

   
    const validateForm = () => {
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required!';
        }
        if (!email) {
            errors.email = 'Email is required!';
        }
        if (!mobile) {
            errors.mobile = 'Mobile is required!';
        }
        if (!designation) {
            errors.designation = 'Designation is required!';
        }
        if (!gender) {
            errors.gender = 'Gender is required!';
        }
        if (course.length === 0) {
            errors.course = 'At least one course must be selected!';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleCourseChange = (e) => {
        const value = e.target.value
        setCourse(value)
    }

    useEffect(()=>{
        if (editId) {
            const emp = employee.find((ele) => ele._id === editId);
            if (emp) {
                setEmp(emp);
                setName(emp.name || '');
                setEmail(emp.email || '');
                setMobile(emp.mobile || '');
                setDesignation(emp.designation || '');
                setGender(emp.gender || '');
                setCourse(emp.course || []);
                setImage(emp.image || '')
            }
        }
    },[editId,employee])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const validateErr = validateForm()
        if(validateErr){
        const formData = {
            name, 
            email, 
            mobile, 
            designation,
            gender,
            course,
            image,
        }
        try {
            let response;
            if (editId) {
                response = await axios.put(`http://localhost:3000/api/employees/${editId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                employeeDispatch({ type: 'UPDATE_EMPLOYEE', payload: response.data })
                props.toggle()
            } else {
                response = await axios.post('http://localhost:3000/api/employees', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                employeeDispatch({ type: 'ADD_EMPLOYEE', payload: response.data });
            }
            setName('')
            setEmail('')
            setMobile('')
            setDesignation('')
            setGender('')
            setCourse([])
            setImage(null)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setServerError(err.response.data.errors);
            } else {
                console.log(err);
            }
        }
    }
};

    console.log(serverError)
    console.log(formErrors)

    return(
        <>
        <form onSubmit={handleSubmit}>
        <h2>Employee Registraion</h2>
            <ul>
            {serverError? 
            serverError.map((ele,i)=>{
                return <li key = {i} style = {{color : 'red'}}>{ele.msg}</li>
            })
            : null}
            </ul>
            <div>
                <label htmlFor="name">Name</label>
                <input type = 'text'
                id = 'name'
                value = {name}
                onChange={(e)=>{setName(e.target.value)}}
                />
            </div>
            {formErrors.name && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.name}</small>}
            <div>
                <label htmlFor="email">Email</label>
                <input type = 'email'
                id = 'email'
                value = {email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
            </div>
            {formErrors.email && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.email}</small>}

            <div>
                <label htmlFor="mobile">Mobile</label>
                <input type = 'Number'
                id = 'mobile'
                value = {mobile}
                onChange={(e)=>{setMobile(e.target.value)}}
                />
            </div>
            {formErrors.mobile && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.mobile}</small>}
            <div>
                <label htmlFor="designation">Designation</label>
                <select
                id = 'designation'
                value = {designation}
                onChange={(e)=>{setDesignation(e.target.value)}}
                >
                <option value = ''>Select Designation</option>
                <option value = 'Hr'>Hr</option>
                <option value = 'Manager'>Manager</option>
                <option value = 'sales'>Sales</option>
                </select>
            </div>
            {formErrors.designation && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.designation}</small>}
            <div>
                <label htmlFor="gender">Gender</label>
                <input type = 'radio'
                id = 'male'
                name = 'gender'
                value = 'male'
                checked={gender === "male"}
                onChange={(e)=>{setGender(e.target.value)}}
                />
                <label htmlFor = 'male'>male</label>
                <input type = 'radio'
                id = 'female'
                name = 'gender'
                value = 'female'
                checked={gender === "female"}
                onChange={(e)=>{setGender(e.target.value)}}
                />
                <label htmlFor = 'female'>female</label>
            </div>
            {formErrors.gender && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.gender}</small>}
            <label>Courses</label>
                        <input
                            type="checkbox"
                            id="MCA"
                            value="MCA"
                            checked={course.includes("MCA")}
                            onChange={handleCourseChange}
                        />
                        <label htmlFor="MCA">MCA</label>
                        <input
                            type="checkbox"
                            id="BCA"
                            value="BCA"
                            checked={course.includes("BCA")}
                            onChange={handleCourseChange}
                        />
                        <label htmlFor="BCA">BCA</label>
                        <input
                            type="checkbox"
                            id="BSC"
                            value="BSC"
                            checked={course.includes("BSC")}
                            onChange={handleCourseChange}
                        />
                        <label htmlFor="BSC">BSC</label><br/>
                        {formErrors.course && <small style={{ color: 'red', fontSize: '1rem' }}>{formErrors.course}</small>}
                        <div>
                    <label htmlFor="image">photo</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"  
                        onChange={handleImageChange}
                    />
                </div>
                        <div>
                            <input type = 'submit'/>
                        </div>
            </form>
        </>
    )
}