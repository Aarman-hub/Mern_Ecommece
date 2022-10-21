import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/auth';

const Nav = () => {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () =>{
    setAuth({...auth, user:null, token:""});
    localStorage.removeItem("auth");
    navigate("/login");
  }
  return (
    <>  
        <ul className="nav d-flex justify-content-between shadow-sm mb-2">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/"}>Home</NavLink>
            </li>
            {!auth?.user ? (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to={'/register'}>Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to={"/login"}>Login</NavLink>
                    </li>
                </>
            ):(
                <li className='nav-item'>
                    <a onClick={logout} className='nav-link pointer'>Logout</a>
                </li>
            )}
            
        </ul>
    </>
  )
}

export default Nav