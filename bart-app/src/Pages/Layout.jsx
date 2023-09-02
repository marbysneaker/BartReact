import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './Layout.css'
import { UserAuth } from '../context/AuthContext'


const Layout = () => {
    const {user, logOut} = UserAuth();
    // console.log("user in layout",user);

    const handleLogout = async () => {
        try
        {
            await logOut();
        }
        catch(error)
        {
            console.log(error);
        }
    }

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
          {user?
            <li onClick={handleLogout}>
                <Link to="/login"> Sign Out</Link>
            </li>
            :
            <li>
            <Link to="/login">Sign In</Link>
          </li>}
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
