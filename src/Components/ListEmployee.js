import { useContext, useState, useEffect } from "react"
import { EmployeeContext } from "../Context/EmployeeContext"
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CreateEmployee from "./CreateEmployee"
import axios from 'axios'

export default function ListEmployee() {
    const { employee, employeeDispatch } = useContext(EmployeeContext)
    const [search, setSearch] = useState('')
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [image,setImage] = useState(null)
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')

    const toggle = () => setModal(!modal)
    const navigate = useNavigate()

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/employees')
            employeeDispatch({ type: 'SET_EMPLOYEES', payload: response.data })
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        filterEmployees(event.target.value)
    }

    const filterEmployees = (value) => {
        if (!value) {
            setFilteredEmployees([])
        } else {
            const filtered = employee.filter(
                (emp) =>
                    emp?.name?.toLowerCase().includes(value?.toLowerCase()) ||
                    emp?.email?.toLowerCase().includes(value?.toLowerCase())
            );
            setFilteredEmployees(filtered)
        }
    }

    const employeesToDisplay = search.length > 0 ? filteredEmployees : employee

    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/employees/${id}`)
                employeeDispatch({ type: 'DELETE_EMPLOYEE', payload: id })
                fetchEmployees()
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={handleSearchChange}
                />
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>photo</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeesToDisplay.map((ele, i) => (
                            <tr key={ele._id}>
                                <td>{i + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.image && <img src={`http://localhost:3000/Images/${ele.image}`} alt={ele.name} width="50" height="50" />}
                                </td>
                                <td>{ele.email}</td>
                                <td>{ele.mobile}</td>
                                <td>{ele.designation}</td>
                                <td>{ele.gender}</td>
                                <td>{ele.course}</td>
                                <td>{ele.createdAt.slice(0, 10)}</td>
                                <td>
                                    <button onClick={() => handleEdit(ele._id)}>Edit</button>
                                    <button onClick={() => handleRemove(ele._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Employee Form</ModalHeader>
                <ModalBody>
                    <CreateEmployee editId={editId} toggle={toggle} />
                </ModalBody>
            </Modal>
        </>
    );
}
