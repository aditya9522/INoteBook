import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <>
        <div className="flex flex-col items-center mt-[10%]">
            <h1 className='font-extrabold text-4xl mb-8 text-blue-500'>INoteBook</h1>
            <form action='' method='' className='p-8 rounded-xl bg-slate-500 w-96'>
                <h1 className="text-white text-center font-extrabold text-3xl uppercase mb-10">SignUp</h1>
                <div className="mb-4">
                    <input type="email" name="email" id="email" placeholder='Email Address' className='w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-400' required/>
                </div>
                <div className="mb-4">
                    <input type='password' name="password" id="password" placeholder='********' className='w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-400' required/>
                </div>
                <div className="flex justify-between mt-8">
                    <button type="submit" className='bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 text-white font-medium'>Submit</button>
                    <Link to="/login" className='bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 text-white font-medium'>Login</Link>
                </div>
            </form>
        </div>
    </>
  )
}

export default SignUp