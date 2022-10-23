import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminNav = () => {
  return (
    <>
        <div className='bg-light my-2 p-3 h4'>Admin Link</div>
        <ul className='list-group list-unstyled'>
            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/categories">Categories</NavLink>
            </li>
            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/products">Products</NavLink>
            </li>
            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/products/create">Products create</NavLink>
            </li>
        </ul>
    </>
  )
}

export default AdminNav