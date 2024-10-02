import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const n1 = {
        "name": "Ajay Patel",
        "email": "ajay055356@gmail.com",
        "title": "Ha ha hahh!",
        "tag": "Funn"
    }
    
    const [notes, setNotes] = useState(n1)

    const updateNotes = () => {
        setTimeout(() => {
            setNotes({
                "name": "Aman Patel",
                "email": "aman@gmail.com",
                "title": "Aww",
                "tag": "Mew"
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{notes, updateNotes}}>
            { props.children }
        </NoteContext.Provider>
    )
}

export default NoteState