import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useEffect } from 'react';

function Dashboard() {
  const data = useContext(NoteContext);

  useEffect(() => {
    data.updateNotes();
    // eslint-disable-next-line
  }, [])    // [] - to run only once like use as componentDidMount
  
  return (
    <div>

      <div className="">
        <h1>Dashboard</h1>
        <h2>{data.notes.name}</h2>
        <h2>{data.notes.email}</h2>
        <h2>{data.notes.tag}</h2>
      </div>
      
    </div>
  )
}

export default Dashboard