import styles from "./add_note_btn.module.css"
const AddNoteBtn = (props) => {
    const handleAddNote = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/notes",
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
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
        }
        catch(error){
            console.log(error);
        }
    };
    return (
        <>
            <div className={styles.addNoteBtn}>
                <span className={styles.btnText} onClick={handleAddNote}>Add New Note</span>
            </div>
        </>
    )
}
export default AddNoteBtn;