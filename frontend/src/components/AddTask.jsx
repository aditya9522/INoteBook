import React from 'react'

function AddTask(props) {
    const { task, change, submit } = props;

    return (
        <div>
            <h1 className='text-2xl font-bold mb-3 text-blue-500'>Add Task</h1>
            <form onSubmit={submit} action="" method="" className="">
                <div className='w-8/12 mx-auto border p-6 rounded-lg bg-gray-50'>
                    <div className="mb-3">
                        <label htmlFor="name" className='text-md font-medium text-slate-500 w-full'>Task Name</label>
                        <input className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter task name...' name="name" id="name" minLength={5} value={task.name} onChange={change} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className='text-md font-medium text-slate-500 w-full'>Description</label>
                        <input className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter task description...' name="description" id="description" minLength={10} value={task.description} onChange={change} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className='text-md font-medium text-slate-500 w-full'>Tag</label>
                        <input className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter task tag...' name="tag" id="tag" minLength={1} value={task.tag} onChange={change} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="status" className='text-md font-medium text-slate-500 w-full'>Status</label>
                        <div className="flex gap-4 ">
                            <div className="flex flex-row gap-2">
                                <input type="radio" name="status" id="Pending" value="Pending" onChange={change} checked={task.status === "Pending"}/>
                                <label htmlFor="Pending">Pending</label>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="radio" name="status" id="Completed" value="Completed" onChange={change} />
                                <label htmlFor="Completed">Completed</label>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="radio" name="status" id="Postpond" value="Postpond" onChange={change} />
                                <label htmlFor="Postpond">Postpond</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-4 w-8/12 mx-auto">
                    <button type="submit" className='py-2 px-4 text-white font-semibold rounded-lg bg-green-500 hover:bg-green-400'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddTask