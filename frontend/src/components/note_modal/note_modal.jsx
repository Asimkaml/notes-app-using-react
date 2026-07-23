import {useState} from "react";
import styles from "./note_modal.module.css";

const NoteModal = (props) => {
    const [title, setTitle] = useState(props.initialTitle || "");
    const [content, setContent] = useState(props.initialContent || "");
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        props.onSave(title, content)
    }
    return (
        <div className={styles.overlay}>
            <form className={styles.modal} onSubmit={handleSubmit}>
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
                    <button type="button" onClick={props.onClose}>
                        Cancel
                    </button>
                    <button type="submit">{props.submitLabel || "Save"}</button>
                </div>
            </form>
        </div>
    );
    
}

export default NoteModal;