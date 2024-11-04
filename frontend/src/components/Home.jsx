import React, { useContext, useEffect, useState } from 'react'
import TaskContext from '../context/tasks/TaskContext';
import AddTask from './AddTask';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const { tasks, fetchTask, addTask, removeTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({ name: "", description: "", status: "Pending", tag: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('token');

    if (userToken) {
      fetchTask();
    } else {
      toast("Login required.");
      navigate('/login');
    } 
  }, [])

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()     // to preventing the page reload
    const res = await addTask(newTask.name, newTask.description, newTask.status, newTask.tag);
    console.log(res)

    if (res.status) {
      toast('Task added successfully.')
      setNewTask({ name: "", description: "", status: "Pending", tag: "" });
    } else {
      toast('Please provide valid task details.', {type: "warning"})
    }
  }

  const handleDelete = (id) => {
    removeTask(id);
    toast('Task removed successfully.')
  }

  return (
    <div>

      <h1 className='text-2xl font-bold mb-3 text-slate-700'>Welcome Mr. Nikhil</h1>
      <div className="border shadow-md shadow-gray-300 px-6 py-3 rounded-lg mb-4">
        <AddTask task={newTask} change={handleChange} submit={handleSubmit} />
      </div>

      <div className="border shadow-md shadow-gray-300 px-6 py-3 rounded-lg mb-5">
        <h1 className='text-2xl font-bold mb-3 text-blue-500'>Tasks</h1>
        {
          tasks.length === 0 ? <div className="text-center my-5 font-bold text-lg">Tasks Not Available</div> :

            <table className="border bg-white w-full text-left text-lg">
              <thead className=''>
                <tr className='bg-blue-500 text-white '>
                  <th className='p-3'>S.No.</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className=''>
                {tasks.map((data, index) => {
                  return (
                    <tr className="border-b" key={index}>
                      <td className='p-3 text-blue-500 font-medium'>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.description}</td>
                      <td>{data.tag}</td>
                      <td>{data.status}</td>
                      <td>{data.date}</td>
                      <td>
                        <button className='p-1.5 text-white hover:bg-red-400 rounded-lg text-sm bg-red-500' onClick={() => handleDelete(data._id)}>Delete</button>
                        <Link className='ml-4 p-1.5 text-white hover:bg-yellow-400 rounded-lg text-sm bg-yellow-500' to={`/edit-task/${data._id}`}>Edit</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        }
      </div>

    </div>
  )
}

export default Home