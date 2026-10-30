import {useState} from 'react'

import styles from "./note_card.module.css"
import NoteModal from '../note_modal/note_modal'
import { api } from "../../api.js";

const NoteCard = (props) => {

    const [isEditing, setIsEditing] = useState(false)

    const handleDelete = () =>{
        if( window.confirm("Delete this Note?")){
            props.onDelete(props.id);
        }
    }

    const handleUpdate = async (title, content) => {
        const updated = await api(`/api/notes/${props.id}`, {
            method: "PUT",
            body: { title, content },
        });
        props.onUpdate(props.id, updated);
        setIsEditing(false);
        };
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