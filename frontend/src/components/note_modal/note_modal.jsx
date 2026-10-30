import {useState} from "react";
import styles from "./note_modal.module.css";

const NoteModal = (props) => {
    const [title, setTitle] = useState(props.initialTitle || "");
    const [content, setContent] = useState(props.initialContent || "");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title cannot be empty.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await props.onSave(title.trim(), content);
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <form className={styles.modal} onSubmit={handleSubmit}>
                <input
                    className={styles.titleInput}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    required
                />
                <textarea
                    className={styles.contentInput}
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    maxLength={5000}
                />
                <div className={styles.modalActions}>
                    {error && <p className={styles.error} role="alert">{error}</p>}
                    <button type="button" onClick={props.onClose}>
                        Cancel
                    </button>
                    <button type="submit" disabled={saving}>
                        {saving ? "Saving..." : props.submitLabel || "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
    
}

export default NoteModal;