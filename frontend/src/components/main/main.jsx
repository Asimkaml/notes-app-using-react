import NoteCard from "../card/note_card.jsx";
import styles from './main.module.css';
import {useState, useEffect} from 'react';
const Main = (props) => {
    
    // const notes = [
    //     { topic: "Work", title: "First Note", content: "This is the content of the first note." },
    //     { topic: "Personal", title: "Second Note", content: "This is the content of the second note." },
    //     { topic: "Education", title: "Third Note", content: "This is the content of the third note." },
    // ];
    
    return (
        <div className={styles.mainContent}>
            {props.notes.map(note => {
                return (
                    <NoteCard
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        content={note.content}
                        onDelete={props.onDeleteNote}
                        onUpdate={props.onUpdateNote}
                    />
               );
            })}
            {/* <NoteCard topic="Work" title="First Note" content="This is the content of the first note." />
            <NoteCard topic="Personal" title="Second Note" content="This is the content of the second note." />
            <NoteCard topic="Education" title="Third Note" content="This is the content of the third note." />   */}
        </div>

    )
}

export default Main;