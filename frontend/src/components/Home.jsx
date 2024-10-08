import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

function Home() {
  const { notes, addNote, removeNote, editNote } = useContext(NoteContext);
  const [newNote, setNewNote] = useState({ title: "", description: "", tag: ""});

  const handleChange = (e) => {
    setNewNote({...newNote, [ e.target.name ] : e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault()     // to preventing the page reload
    addNote(newNote.title, newNote.description, newNote.tag);
    alert("Note added!")
  }

  const handleDelete = (id) => {
    removeNote(id);
  }

  return (
    <div>

      <h1 className='text-3xl font-bold mb-3 text-slate-700'>Home</h1>
      <div className="border shadow-md shadow-gray-300 px-6 py-3 rounded-lg mb-4">
        <h1 className='text-2xl font-bold mb-3 text-blue-500'>Add Note</h1>
        <form action="" method="" className="">
          <div className='w-8/12 mx-auto border p-6 rounded-lg bg-gray-50'>
            <div className="mb-3">
              <label htmlFor="title" className='text-md font-medium text-slate-500 w-full'>Title</label>
              <input className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter note title...' name="title" id="title" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className='text-md font-medium text-slate-500 w-full'>Description</label>
              <input className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter note description...' name="description" id="description" onChange={handleChange} required/>
            </div>
            <div className="">
              <label htmlFor="tag" className='text-md font-medium text-slate-500 w-full'>Tag</label>
              <input className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter note tag...' name="tag" id="tag" onChange={handleChange} required/>
            </div>
          </div>
          <div className="my-4 w-8/12 mx-auto">
            <button type="submit" onClick={handleSubmit} className='py-2 px-4 text-white font-semibold rounded-lg bg-green-500 hover:bg-green-400'>Save</button>
          </div>
        </form>
      </div>

      <div className="border shadow-md shadow-gray-300 px-6 py-3 rounded-lg mb-5">
        <h1 className='text-2xl font-bold mb-3 text-blue-500'>Notes</h1>
        <table className="border bg-white w-full text-left text-lg">
          <thead className=''>
            <tr className='bg-blue-500 text-white '>
              <th className='p-3'>S.No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tag</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=''>
            {notes.map((data, index) => {
              return (
                <tr className="border-b" key={index}>
                  <td className='p-3 text-blue-500 font-medium'>{index+1}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.tag}</td>
                  <td>{data.date}</td>
                  <td>
                    <button className='p-1.5 text-white hover:bg-red-400 rounded-lg text-sm bg-red-500' onClick={() => handleDelete(data._id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Home