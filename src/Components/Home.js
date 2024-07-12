import { Link,useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from './AuthContext'

export default function Header() {
    const {user,handleLogout} = useAuth()
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem('token')
        handleLogout()
        navigate('/login')
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    {user ?
                    <>
                    <li className="nav-item">
                    <Link className="nav-link" to="/register-employee">create Employee</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/employee">Employees List</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogOut}>logout</Link>
                </li>
                </> 
                 : null
                    }
                    
                </ul>
            </div>
        </nav>
        </>
    )
}

