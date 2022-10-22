import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
const Loading = () => {
  const [count, setCount] = useState(10);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(()=>{
        setCount((currentCount)=> --currentCount);
    },  1000);

    count === 0 && navigate("/login", {state: location.pathname});

    return () => clearInterval(interval)
  }, []);
  
  
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <h2>Redirecting you in {count} seconds.</h2>
    </div>
  )
}

export default Loading