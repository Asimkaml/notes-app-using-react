import NoteCard from "../card/note_card.jsx";
import styles from './main.module.css';
const Main = () => {
    const notes = [
        { topic: "Work", title: "First Note", content: "This is the content of the first note." },
        { topic: "Personal", title: "Second Note", content: "This is the content of the second note." },
        { topic: "Education", title: "Third Note", content: "This is the content of the third note." },
    ];
    return (
        <div className={styles.mainContent}>
            {/* {notes.map(note => {
                console.log(note);
                return <NoteCard  topic={note.topic} title={note.title} content={note.content} />;
            })} */}
            <NoteCard topic="Work" title="First Note" content="This is the content of the first note." />
            <NoteCard topic="Personal" title="Second Note" content="This is the content of the second note." />
            <NoteCard topic="Education" title="Third Note" content="This is the content of the third note." />  
        </div>

    )
}

export default Main;