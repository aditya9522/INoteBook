import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../context/tasks/TaskContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditTask() {
    const { tasks, fetchTask, editTask } = useContext(TaskContext);
    const [newTask, setNewTask] = useState({ ename: "", edescription: "", estatus: "Pending", etag: "" });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchTask();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let task = tasks.find((data) => data._id === id);

        if (task) {
            setNewTask({ ename: task.name, edescription: task.description, estatus: task.status, etag: task.tag })
        }
    }, [tasks, id])

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await editTask(newTask.ename, newTask.edescription, newTask.estatus, newTask.etag, id);
        console.log(res)

        if (res.status) {
            navigate('/home')
            toast("Task updated successfully.", { type: "success" })
        } else {
            toast("Please provide valid task details.", { type: "warning" })
        }
    }

    return (
        <div className='border shadow-md shadow-gray-300 px-6 py-3 rounded-lg mb-4'>
            <h1 className='text-2xl font-bold mb-3 text-blue-500'>Edit Task</h1>
            <form onSubmit={handleSubmit} action="" method="" className="">
                <div className='w-8/12 mx-auto border p-6 rounded-lg bg-gray-50'>
                    <div className="mb-3">
                        <label htmlFor="name" className='text-md font-medium text-slate-500 w-full'>Task Name</label>
                        <input value={newTask.ename} className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter task name...' name="ename" id="name" minLength={3} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className='text-md font-medium text-slate-500 w-full'>Description</label>
                        <input value={newTask.edescription} className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter task description...' name="edescription" id="description" minLength={10} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className='text-md font-medium text-slate-500 w-full'>Tag</label>
                        <input value={newTask.etag} className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter task tag...' name="etag" id="tag" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <p className='text-md font-medium text-slate-500 w-full'>Status</p>
                        <div className="flex gap-4 ">
                            <div className="flex flex-row gap-2">
                                <input type="radio" name="estatus" id="Pending" value="Pending" onChange={handleChange} checked={ newTask.estatus === "Pending" }/>
                                <label htmlFor="Pending">Pending</label>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="radio" name="estatus" id="Completed" value="Completed" onChange={handleChange} checked={ newTask.estatus === "Completed" }/>
                                <label htmlFor="Completed">Completed</label>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="radio" name="estatus" id="Postpond" value="Postpond" onChange={handleChange} checked={ newTask.estatus === "Postpond" }/>
                                <label htmlFor="Postpond">Postpond</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-4 w-8/12 mx-auto">
                    <button type="submit" className='py-2 px-4 text-white font-semibold rounded-lg bg-green-500 hover:bg-green-400'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditTask