import React, { useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/card/Jumbotron';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();
 
  const handleChnage = async (e) =>{
    e.preventDefault();

    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API}/user/register`,{name, email, password});
        if(data?.error){
            toast.error(data.error);
        }else{
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth({...auth, token: data.token, user: data.user});
            toast.success("Register successfully.")
            navigate("/");
        }
    } catch (error) {
        toast.error(error)
    }
  }

  return (
        <>
            <Jumbotron title={"Register"} subTitle="React Ecommerce" />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 pt-5'>
                        <input type="text" 
                            placeholder="Name"
                            className='form-control mb-4 p-2'
                            value={name} 
                            onChange={(e)=> setName(e.target.value)}
                            autoFocus
                         />
                         <input type="text" 
                            placeholder="Email"
                            className='form-control mb-4 p-2'
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)}
                            autoFocus
                         />
                         <input type="text" 
                            placeholder="Password"
                            className='form-control mb-4 p-2'
                            value={password} 
                            onChange={(e)=> setPassword(e.target.value)}
                            autoFocus
                         />
                         <button className='btn btn-primary btn-block w-100' onClick={handleChnage} type='submit'>Register</button>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Register