import React from 'react'
import {useNavigate} from 'react-router-dom';

const PageNotFound = () => {
  
  const navigate = useNavigate();
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div>
            <h2>404 Ops! page not found!</h2>
            <div>
                <button className='btn btn-primary' onClick={()=>navigate('/')}>Go Home</button>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound