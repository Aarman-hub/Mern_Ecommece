import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../server/controllers/auth';

const Loading = () => {
  const [count, setCount] = useState(10);
  
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(()=>{
        setCount((currentCount)=> --currentCount);
    },  1000);

    count === 0 && navigate("/login");

    return () => clearInterval(interval)
  }, [count, navigate]);
  
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <h2>Redirecting you in {count} seconds.</h2>
    </div>
  )
}

export default Loading