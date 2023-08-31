import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './Layout.css'
import { UserAuth } from '../context/AuthContext'

const Layout = () => {
  return (

    <>
    <div className='nav-bar'>
       
      
        <ul>
          <li className='logo'>
            <Link to="/">Bart React App</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
            <li>
            <Link to="/signup">Sign Up</Link>
            </li>
        </ul>
     
        </div>

      <Outlet />
      
    </>
    
  )
}

export default Layout
