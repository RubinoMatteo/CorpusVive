import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Page2 from "./Page2.jsx";
import Login from "./Login";
import AdminInterface from "./AdminInterface.jsx"
import Esercizio from "./PageEsercizi.jsx"
import NewWorkout from "./NewWorkOut.jsx"
import PageUser from "./Account/User/User.jsx"
import Registrati from "./Registrati.jsx"
import Curziosky from "./Curziosky.jsx"


        //<Route path="/New-workout" element={<NewWorkout/>} />
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/Tutti-gli-esercizi" element={<Page2/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/esercizio/:id" element={<Esercizio/>} />
        <Route path="/New-workout/:userId" element={<NewWorkout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path ="/wp-admin" element={<AdminInterface/>} />
        <Route path="/wp-user/:id" element={<PageUser/>} />
        <Route path="/Registrati" element={<Registrati/>} />
        <Route path="/eg" element={<Curziosky/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);