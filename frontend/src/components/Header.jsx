import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className=''>
        <div className="flex justify-between items-center p-4 bg-slate-600 fixed top-0 w-full">
            <h1 className='font-extrabold text-2xl text-white'>TMS</h1>
            <div className="flex gap-4">
                <Link to="/home" className={`${location.pathname === "/home"? "bg-blue-500" : ""} hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium`}>Home</Link>
                <Link to="/about" className={`${location.pathname === "/about"? "bg-blue-500" : ""} hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium`}>About</Link>
                <Link to="/profile" className={`${location.pathname === "/profile"? "bg-blue-500" : ""} hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium`}>Profile</Link>
                <p className='cursor-pointer bg-red-500 ml-5 px-4 py-2 rounded-lg hover:bg-red-400 text-white font-medium' onClick={logOut}>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Header