import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <div>
        <div className="flex justify-between items-center p-4 bg-cyan-400">
            <h1 className='font-extrabold text-2xl text-white'>INoteBook</h1>
            <div className="flex gap-4">
                <Link to="/dashboard" className={`${location.pathname === "/dashboard"? "bg-blue-500" : ""} hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium`}>Dashboard</Link>
                <Link to="/profile" className={`${location.pathname === "/profile"? "bg-blue-500" : ""} hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium`}>Profile</Link>
                <Link to="/about" className={`${location.pathname === "/about"? "bg-blue-500" : ""} hover:bg-blue-400 px-4 py-2 rounded-lg text-white font-medium`}>About</Link>
                <Link to="/logout" className='bg-red-500 ml-10 px-4 py-2 rounded-lg hover:bg-red-400 text-white font-medium'>Logout</Link>
            </div>
        </div>
    </div>
  )
}

export default Header