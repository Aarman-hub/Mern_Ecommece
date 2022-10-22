import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/card/Jumbotron';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuth] = useAuth();
   
    const handleChnage = async (e) =>{
      e.preventDefault();
  
      try {
          const {data} = await axios.post(`/user/login`,{ email, password});
          
          if(data?.error){
              toast.error(data.error);
          }else{
              localStorage.setItem("auth", JSON.stringify(data));
              setAuth({...auth, token: data.token, user: data.user});
              toast.success("Login successfully.")
              navigate( location.state || `/dashboard/${data?.user?.role === 1 ? "admin":"user"}`);
          }
      } catch (error) {
          toast.error(error)
      }
    }
  
    return (
          <>
              <Jumbotron title={"Login"} subTitle="React Ecommerce" />
              <div className='container'>
                  <div className='row'>
                      <div className='col-md-6 offset-md-3 pt-5'>
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
                           <button className='btn btn-primary w-100' onClick={handleChnage} type='submit'>Login</button>
                      </div>
                  </div>
              </div>
          </>
    )
}

export default Login