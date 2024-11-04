import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function SignUp() {
    const [credential, setCredential] = useState({name:"", email:"", password:""})
    const [confirmPass, setConfirmPass] = useState("");

    const handleChange = (event) => {
        setCredential({ ...credential, [event.target.name] : event.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credential.password !== confirmPass) {
            toast("Passwords didn't matched.", {type: "info"})
            
        } else {
            const response = await fetch(`http://localhost:5000/api/auth/create-user`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password})
            });
            
            const data = await response.json();
            console.log(data);
            
            if (data.success) {
                toast("You’ve successfully registered.", {type: "success"})
                setCredential({name:"", email:"", password:""})
                setConfirmPass(''); 

            } else if (data.mailExist) {
                toast("User already exists with this mail.", {type: "warning"})

            } else {
                setCredential({name:"", email:"", password:""})
                setConfirmPass(''); 
                toast("Please provide valid details.", {type: "error"})
            }
        }
    }

  return (
    <>
        <div className="flex flex-col items-center mt-[10%]">
            <h1 className='font-extrabold text-4xl mb-8 text-blue-500'>TMS</h1>
            <form onSubmit={handleSubmit} action='' method='' className='p-8 rounded-xl bg-slate-500 w-96'>
                <h1 className="text-white text-center font-extrabold text-3xl uppercase mb-10">SignUp</h1>
                <div className="mb-4">
                    <input type="text" name="name" id="name" placeholder='Enter Name' className='w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-400' minLength={5} value={credential.name} onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="mb-4">
                    <input type="email" name="email" id="email" placeholder='Email Address' className='w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-400' value={credential.email} onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="mb-4">
                    <input type='password' name="password" id="password" placeholder='Password' className='w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-400' minLength={5} value={credential.password} onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="mb-4">
                    <input type='password' name="confirmPass" id="confirmPass" placeholder='Confirm Password' className='w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-red-400' minLength={5} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required/>
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