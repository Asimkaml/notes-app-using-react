import {useState} from "react";
import styles from "./add_note_btn.module.css"
const AddNoteBtn = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    const handleAddNote = async (event) => {
        event.preventDefault();
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
                <div className={styles.overlay}>
                    <form className={styles.modal} onSubmit={handleAddNote}>
                        <input
                            className={styles.titleInput}
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            className={styles.contentInput}
                            placeholder="Write your note..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                        />
                        <div className={styles.modalActions}>
                            <button type="button" onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
export default AddNoteBtn;