import React from 'react'
import Jumbotron from '../../components/card/Jumbotron';
import AdminNav from '../../components/nav/AdminNav';
import { useAuth } from '../../context/auth';

const AdminProduct = () => {
    const [auth, setAuth] = useAuth();
    return (
      <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Products" />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminNav />
            </div>
            <div className='col-md-9'>
              <div className='h2'>Admin Products</div>
            </div>
          </div>
        </div>
      </>
    )
}

export default AdminProduct