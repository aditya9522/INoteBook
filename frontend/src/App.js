import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Header from "./components/Header";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddNotes from "./components/AddNotes";
import Profile from "./components/Profile";
import About from './components/About';

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ComponentWrapper showHeader={false} Component={Home} />} />
          <Route path='/login' element={<ComponentWrapper showHeader={false} Component={Login} />} />
          <Route path='/signup' element={<ComponentWrapper showHeader={false} Component={SignUp} />} />
          <Route path='/dashboard' element={<ComponentWrapper showHeader={true} Component={Dashboard} />} />
          <Route path='/addnote' element={<ComponentWrapper showHeader={true} Component={AddNotes} />} />
          <Route path='/profile' element={<ComponentWrapper showHeader={true} Component={Profile} />} />
          <Route path='/about' element={<ComponentWrapper showHeader={true} Component={About} />} />
          <Route path='/*' element={<><h1 className="flex justify-center items-center font-bold text-3xl h-screen">Not Found</h1></>} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

function ComponentWrapper({ showHeader, Component }) {
  return (
    <>
      {showHeader && <Header />}
      <div className="flex justify-center bg-gray-100">
        <Component />
      </div>
    </>
  );
}

export default App;
