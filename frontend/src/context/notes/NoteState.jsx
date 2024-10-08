import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const n1 = [
        {
        "_id": "66f610b7b3fb82af593d8f5d",
        "user": "66ec5b39e6092f7dc949f746",
        "title": "Study",
        "description": "I have to complete the full NODEJS course.",
        "tag": "Most Imp",
        "date": "2024-09-27T01:56:07.310Z",
        "__v": 0
        },
        {
        "_id": "66f615a5f4b7c8ad03407928",
        "user": "66ec5b39e6092f7dc949f746",
        "title": "Travel",
        "description": "I have to go Kailash moutain from Indore.",
        "tag": "Moto",
        "date": "2024-09-27T02:17:09.921Z",
        "__v": 0
        },
        {
        "_id": "66f61d09e6df8d6eea0acbb2",
        "user": "66ec5b39e6092f7dc949f746",
        "title": "Casual",
        "description": " I've to travel the full world.",
        "tag": "Goal",
        "date": "2024-09-27T02:48:41.286Z",
        "__v": 0
        },
        {
        "_id": "66f6f1746782742fd3a8cb5a",
        "user": "66ec5b39e6092f7dc949f746",
        "title": "Casual",
        "description": " I've to travel the full world.",
        "tag": "Goal",
        "date": "2024-09-27T17:55:00.012Z",
        "__v": 0
        }
    ]
    
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