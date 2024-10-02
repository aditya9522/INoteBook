import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className="flex flex-col items-center mt-[10%]">
                <h1 className='font-extrabold text-blue-500 text-4xl mb-8'>Welcome To INoteBook</h1>
                <div className='p-8 rounded-xl bg-slate-500'>
                    <h1 className="text-white font-extrabold text-3xl">A Digital System To Store Daily Notes</h1>
                    <div className="flex justify-center mt-8">
                        <Link to="/login" className='bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-500 text-white font-medium'>Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home