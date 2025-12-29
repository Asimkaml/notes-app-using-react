
import './App.css'
import Header from './components/header/header.jsx'
import Sidebar from './components/sidebar/sidebar.jsx'
import Main from './components/main/main.jsx'
function App() {
  
  return (
    <>
      <Header/>
      <div className="content">
        <Sidebar/>
        <Main/>
      </div>
    </>
  )
}

export default App
