import {useState} from 'react'

import styles from "./note_card.module.css"
import NoteModal from '../note_modal/note_modal'
const NoteCard = (props) => {

    const [isEditing, setIsEditing] = useState(false)

    const handleDelete = () =>{
        if( window.confirm("Delete this Note?")){
            props.onDelete(props.id);
        }
    }

    const handleUpdate = async (title ,content) => {
        try{
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/notes/${props.id}`,{
                method: "PUT",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify({title,content})                
            })
            const updatedNote = await res.json();
            props.onUpdate(props.id, updatedNote)
            setIsEditing(false)

        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>{props.title}</span>

                <div className={styles.btnSection}>
                    <button className={styles.iconBtn} onClick={() => setIsEditing(true)}>✎</button>
                    <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={handleDelete}>
                        ✕
                    </button>
                </div>
            </div>
            <div className={styles.cardContent}>
                <p>{props.content}</p>
            </div>
            {isEditing && (
                <NoteModal 
                    initialTitle={props.title}
                    initialContent={props.content}
                    submitLabel="Update"
                    onSave={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
}
export default NoteCard;