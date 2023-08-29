import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
  return (

    <>
    <div className='nav-bar'>
       
      
        <ul>
          <li>
            <Link to="/">Bart React App</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/contact">Sign In</Link>
          </li>
        </ul>
     
        </div>

      <Outlet />
      
    </>
    
  )
}

export default Layout
