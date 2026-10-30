import NoteCard from "../card/note_card.jsx";
import styles from './main.module.css';
import {useState, useEffect} from 'react';
const Main = (props) => {
    

    
    if (props.loading) return <p className={styles.status}>Loading notes...</p>;

    if (props.error) {
        return (
            <div className={styles.status} role="alert">
            <p>{props.error}</p>
            <button onClick={props.onRetry}>Retry</button>
            </div>
        );
    }

    if (props.notes.length === 0) {
        return (
            <p className={styles.status}>
            {props.hasQuery ? "No notes match your search." : "No notes yet. Add one!"}
            </p>
        );
    }

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
            
        </div>

    )
}

export default Main;