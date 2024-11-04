import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Login() {
    const [credential, setCredential] = useState({email:"", password:""})
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredential({ ...credential, [event.target.name] : event.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credential.email, password: credential.password})
          });
        
        const data = await response.json();
        
        if (data.success) {
            toast("You’ve successfully logged in.", {type: "success"})
            localStorage.setItem('token', data.authToken)
            navigate('/home')
        } else {
            setCredential({email:"", password:""})
            toast("Invalid credentials", {type: "warning"})
        }
    }
    
    return (
        <>
        <div className="relative h-screen w-screen" style={{ backgroundImage: "url('images/login.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            <div className="absolute inset-0">
                <div className="w-[60%] flex flex-col justify-center items-center h-full">
                    <h3 className="font-extrabold text-2xl mb-5 text-blue-500">Login to continue ...</h3>
                    <form onSubmit={handleSubmit} className="w-96 p-8 rounded-xl backdrop-blur-xl shadow-inner shadow-fuchsia-600">
                        <h1 className="text-white text-center font-extrabold text-3xl uppercase mb-10">Login</h1>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                className="w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-yellow-400"
                                value={credential.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                className="w-full rounded-md p-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-yellow-400"
                                value={credential.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="flex justify-between mt-8">
                            <button type="submit" className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 text-white font-medium">
                                Submit
                            </button>
                            <Link to="/signup" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 text-white font-medium">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login