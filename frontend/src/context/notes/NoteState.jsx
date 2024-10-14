import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const host = "http://localhost:5000"

    const fetchNote = async () => {
        const response = await fetch(`${host}/api/notes/fetch-notes`, {
            method: 'GET',
            headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNDkyYjFlNDJhMzU4MTIzZDVmMmQxIn0sImlhdCI6MTcyODg4ODI4MX0.6099jLWH9EIzv42Rtx7tuywwQJ8rJOhtQyzsFLvGkd8',
            }
          });
        
        const data = await response.json();
        setNotes(data)
    }
    
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/createNotes`, {
            method: 'POST',
            headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNDkyYjFlNDJhMzU4MTIzZDVmMmQxIn0sImlhdCI6MTcyODg4ODI4MX0.6099jLWH9EIzv42Rtx7tuywwQJ8rJOhtQyzsFLvGkd8',
              "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
          });
        
        const data = await response.json();
        console.log("Notes Added :\n", data);
        fetchNote();
    }

    const removeNote = async (id) => {
        const response = await fetch(`${host}/api/notes/remove-notes/${id}`, {
            method: 'DELETE',
            headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNDkyYjFlNDJhMzU4MTIzZDVmMmQxIn0sImlhdCI6MTcyODg4ODI4MX0.6099jLWH9EIzv42Rtx7tuywwQJ8rJOhtQyzsFLvGkd8'
            }
          });
        
        const data = await response.json();
        fetchNote();
    }

    const editNote = async (title, description, tag, id) => {
        const response = await fetch(`${host}/api/notes/update-notes/${id}`, {
            method: 'PUT',
            headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhNDkyYjFlNDJhMzU4MTIzZDVmMmQxIn0sImlhdCI6MTcyODg4ODI4MX0.6099jLWH9EIzv42Rtx7tuywwQJ8rJOhtQyzsFLvGkd8',
              "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
          });
        
        const data = await response.json();
        fetchNote();
    }

    return (
        <NoteContext.Provider value={{notes, fetchNote, addNote, removeNote, editNote}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState