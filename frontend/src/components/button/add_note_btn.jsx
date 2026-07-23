import {useState} from "react";
import NoteModal from "../note_modal/note_modal.jsx"
import styles from "./add_note_btn.module.css"

const AddNoteBtn = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    const handleAddNote = async (title, content) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/notes`,
                {
                    method: "POST",
                    headers:{ "Content-Type": "application/json"},
                    body: JSON.stringify({
                        title,
                        content
                    })
                }
            )

            const newNote = await response.json();

            props.setNotes([newNote, ...props.notes]);
            setTitle("");
            setContent("");
            setIsOpen(false);
        }
        catch(error){
            console.log(error);
        }
    };
    return (
        <>
            <div className={styles.addNoteBtn} onClick={() => setIsOpen(true)}>
                <span className={styles.btnText}>Add New Note</span>
            </div>
 
            {isOpen && (
                <NoteModal 
                    initialTitle=""
                    initialContent=""
                    submitLabel="Save"
                    onSave={handleAddNote}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
export default AddNoteBtn;