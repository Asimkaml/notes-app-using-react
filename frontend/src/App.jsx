import {useState, useEffect} from 'react'
import './App.css'
import Header from './components/header/header.jsx'
import Sidebar from './components/sidebar/sidebar.jsx'
import Main from './components/main/main.jsx'
import { api } from "./api.js";
import { useToast } from "./context/toast_context.jsx";

function App() {
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [searchQuery, setSearchQuery] = useState("");

  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");


  useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const fetchNotes = async () => {
    setLoading(true);
    setLoadError("");
    try {
      setNotes(await api("/api/notes"));
    } catch (e) {
      setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await api(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((n) => n.id !== id));
      showToast("Note deleted.", "success");
    } catch (e) {
      showToast(e.message);
    }
  };

  const handleUpdateNote = (id, updatedNote) =>{
    setNotes(prevNotes => prevNotes.map(note => (note.id === id ? updatedNote : note)));
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <>
      <Header 
        setNotes={setNotes} 
        theme={theme} 
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
      />

      <div className="content">
        {/* <Sidebar notes = {notes}/> */}
        <Main
          notes={filteredNotes}
          loading={loading}
          error={loadError}
          onRetry={fetchNotes}
          hasQuery={searchQuery !== ""}
          onDeleteNote={handleDeleteNote}
          onUpdateNote={handleUpdateNote}
        />
      </div>
    </>
  )
}

export default App
