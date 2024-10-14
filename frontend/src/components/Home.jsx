import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import { Link } from 'react-router-dom';

function Home() {
  const { notes, fetchNote, addNote, removeNote } = useContext(NoteContext);
  const [newNote, setNewNote] = useState({ title: "", description: "", tag: ""});
  console.log("User Notes: ", notes)

  useEffect(() => {
    fetchNote()
  }, [])

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
        <AddNote change={handleChange} submit={handleSubmit}/>
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
            {notes.map((data ,index) => {
              return (
                <tr className="border-b" key={index}>
                  <td className='p-3 text-blue-500 font-medium'>{index+1}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.tag}</td>
                  <td>{data.date}</td>
                  <td>
                    <button className='p-1.5 text-white hover:bg-red-400 rounded-lg text-sm bg-red-500' onClick={() => handleDelete(data._id)}>Delete</button>
                    <Link className='ml-4 p-1.5 text-white hover:bg-yellow-400 rounded-lg text-sm bg-yellow-500' to='/edit-note'>Edit</Link>
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