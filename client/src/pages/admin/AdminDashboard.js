import React from 'react'
import Jumbotron from '../../components/card/Jumbotron';
import AdminNav from '../../components/nav/AdminNav';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
    return (
      <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminNav />
            </div>
            <div className='col-md-9'>
              <ul className='list-group'>
                <li className='list-group-item'>{auth?.user?.name}</li>
                <li className='list-group-item'>{auth?.user?.email}</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
}

export default AdminDashboard