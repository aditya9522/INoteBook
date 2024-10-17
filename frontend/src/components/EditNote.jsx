import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useParams, useNavigate } from 'react-router-dom';

function EditNote() {
    const {notes, fetchNote, editNote } = useContext(NoteContext);
    const [newNote, setNewNote] = useState({ etitle: "", edescription: "", etag: ""});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchNote();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let note = notes.find((data) => data._id === id);
    
        if(note){
            setNewNote({ etitle: note.title, edescription: note.description, etag: note.tag})
        }
    }, [notes, id])

    const handleChange = (e) => {
        setNewNote({...newNote, [ e.target.name ] : e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editNote(newNote.etitle, newNote.edescription, newNote.etag, id);
        navigate('/home')
    }

    return (
        <div className='border shadow-md shadow-gray-300 px-6 py-3 rounded-lg mb-4'>
            <h1 className='text-2xl font-bold mb-3 text-blue-500'>Edit Note</h1>
            <form action="" method="" className="">
            <div className='w-8/12 mx-auto border p-6 rounded-lg bg-gray-50'>
                <div className="mb-3">
                <label htmlFor="title" className='text-md font-medium text-slate-500 w-full'>Title</label>
                <input value={newNote.etitle} className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter note title...' name="etitle" id="title" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                <label htmlFor="description" className='text-md font-medium text-slate-500 w-full'>Description</label>
                <input value={newNote.edescription} className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter note description...' name="edescription" id="description" onChange={handleChange} required/>
                </div>
                <div className="">
                <label htmlFor="tag" className='text-md font-medium text-slate-500 w-full'>Tag</label>
                <input value={newNote.etag} className='mt-1 border rounded-lg w-full p-2 text-slate-600 focus:outline-blue-500' type="text" placeholder='Enter note tag...' name="etag" id="tag" onChange={handleChange} required/>
                </div>
            </div>
            <div className="my-4 w-8/12 mx-auto">
                <button type="submit" onClick={handleSubmit} className='py-2 px-4 text-white font-semibold rounded-lg bg-green-500 hover:bg-green-400'>Update</button>
            </div>
            </form>
        </div>
  )
}

export default EditNote