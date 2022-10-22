import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNav = () => {
  return (
    <>
        <div className='bg-light my-2 p-3 h4'>User Link</div>
        <ul className='list-group list-unstyled'>
            <li>
                <NavLink className="list-group-item" to="/dashboard/user/profile">Profile</NavLink>
            </li>
            <li>
                <NavLink className="list-group-item" to="/dashboard/user/orders">Orders</NavLink>
            </li>
        </ul>
    </>
  )
}

export default UserNav