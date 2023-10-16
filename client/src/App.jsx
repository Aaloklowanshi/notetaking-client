import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {Note} from './pages/Note';
import {TopBar} from './components/TopBar'
import SignUp from './pages/SignUp';
import { Login } from './pages/Login';
import Notes from './pages/Notes';
import { CreateNote } from './components/CreateNote';
import { Readnote } from './pages/Readnote';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: "100%",
    height: "100%",
    backgroundColor: "#eeeeee"}}
>
        <Router>
            {/* <TopBar /> */}
            <Routes>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/createnote"} element={<CreateNote />} />
                <Route path={"/notes/:noteId"} element={<Note />} />
                <Route path={"/signup"} element={<SignUp />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/readnote/:noteId"} element={<Readnote/>}/>
                {/* <Route path={"/note/:id"} element={<Note />} /> */}                
            </Routes>
        </Router>
</div>
  )
}

export default App
