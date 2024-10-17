import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Header from "./components/Header";

import Index from "./components/Index";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from './components/About';
import EditNote from './components/EditNote';


function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ComponentWrapper showHeader={false} Component={Index} />} />
          <Route path='/login' element={<ComponentWrapper showHeader={false} Component={Login} />} />
          <Route path='/signup' element={<ComponentWrapper showHeader={false} Component={SignUp} />} />
          <Route path='/home' element={<ComponentWrapper showHeader={true} Component={Home} />} />
          <Route path='/edit-note/:id' element={<ComponentWrapper showHeader={true} Component={EditNote} />} />
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
      <div className="mx-auto w-10/12 mt-24">
        <Component />
      </div>
    </>
  );
}

export default App;
