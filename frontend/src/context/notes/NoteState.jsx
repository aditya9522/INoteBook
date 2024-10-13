import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const fetchNote = async () => {
        const response = await fetch(`${host}/api/notes/fetch-notes`, {
            method: 'GET',
            headers: {
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYzViMzllNjA5MmY3ZGM5NDlmNzQ2In0sImlhdCI6MTcyNjg1OTk3OX0.yWMPNV4YejQ_CGwV_fy3_nVdsscKGfDlumipRjV0mU8',
            },
          })
          .then((response) => response.json())
          .then((notes) => notes);
          
        return response
    }
    
    const n1 = fetchNote()
    const [notes, setNotes] = useState(n1)
    
    const addNote = (title, description, tag) => {
        setNotes(notes.concat({
            "_id": "66f610b7b3fb82af593d8f5d",
            "user": "66ec5b39e6092f7dc949f746",
            title: title,
            description: description,
            tag: tag,
            "date": "2024-09-27T01:56:07.310Z",
            "__v": 0
        }));
    }

    const removeNote = (id) => {
        const updatedNotes = notes.filter((n) => { return n._id !== id })
        console.log("deleted not having id : ", id)

        setNotes(updatedNotes);
    }

    const editNote = () => {
        // edit operation
    }

    return (
        <NoteContext.Provider value={{notes, addNote, removeNote, editNote}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState