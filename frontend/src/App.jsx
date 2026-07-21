import {useState, useEffect} from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Sidebar from './components/sidebar/sidebar.jsx'
import Main from './components/main/main.jsx'

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async ()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE}/notes`)
            // const notes: Note[] = await response.json();
            const notes = await response.json();
            setNotes(notes);
            if(!notes || notes.length === 0){
                console.log("No notes found");
            }
        } catch (e) {
        console.log(e);
        }
    }
    useEffect(()=>{
        fetchNotes();
    }, [])


  return (
    <>
      <Header notes={notes} setNotes={setNotes}/>
      <div className="content">
        <Sidebar titles = {Object.keys(notes).map(key => notes[key].title)} />
        <Main notes = {notes}/>
      </div>
    </>
  )
}

export default App
