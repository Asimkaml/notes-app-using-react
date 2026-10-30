import { useState } from "react";
import NoteModal from "../note_modal/note_modal.jsx";
import { api } from "../../api.js";
import styles from "./add_note_btn.module.css";

const AddNoteBtn = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddNote = async (title, content) => {
    const newNote = await api("/api/notes", { method: "POST", body: { title, content } });
    props.setNotes((prev) => [newNote, ...prev]);
    setIsOpen(false);
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