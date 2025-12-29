import styles from "./add_note_btn.module.css"
const AddNoteBtn = () => {
    return (
        <>
            <div className={styles.addNoteBtn}>
                <span className={styles.btnText}>Add New Note</span>
            </div>
        </>
    )
}
export default AddNoteBtn;