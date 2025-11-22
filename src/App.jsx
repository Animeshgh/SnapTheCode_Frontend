import React,{ useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar"
import AddSnippet from "./components/AddSnippet/AddSnippet";
import Login from "./components/Profile/login";
import Register from "./components/Profile/Register";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import SnippetView from "./components/Snippetview/SnippetView";
import EditSnippet from "./pages/EditSnippet"


function App() {
   const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar setSearchTerm={setSearchTerm}/>
      
       <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm}/>}/>
        <Route path="/add" element={<AddSnippet />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register"element={<Register/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/snippet/:id" element={<SnippetView />} />
        <Route path="/edit/:id" element={<EditSnippet />} />



      </Routes>
    </div>
  );
}


export default App;
