import {useState, useEffect} from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Sidebar from './components/sidebar/sidebar.jsx'
import Main from './components/main/main.jsx'

function App() {
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

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


  const handleDeleteNote = async (id)=>{
    try{
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/notes/${id}`,{
        method:"DELETE"
      });
      if(!res.ok){
        console.log("Delete failed:", res.status);
        return;
      }
      setNotes(prevNotes=> prevNotes.filter(note=>note.id !== id))
    }
    catch(error){
      console.log(error);
    }
  }

  const handleUpdateNote = (id, updatedNote) =>{
    setNotes(prevNotes => prevNotes.map(note => (note.id === id ? updatedNote : note)));
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLocaleLowerCase) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <>
      <Header 
        notes={notes} 
        setNotes={setNotes} 
        theme={theme} 
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
      />

      <div className="content">
        <Sidebar notes={notes} />
        <Main 
          notes={filteredNotes} 
          onDeleteNote={handleDeleteNote} 
          onUpdateNote={handleUpdateNote}

        />
      </div>
    </>
  )
}

export default App
