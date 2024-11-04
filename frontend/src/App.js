import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskState from './context/tasks/TaskState';
import Header from "./components/Header";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Index from "./components/Index";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from './components/About';
import EditTask from './components/EditTask';

function App() {
  return (
    <TaskState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ComponentWrapper showHeader={false} Component={Index} />} />
          <Route path='/login' element={<ComponentWrapper showHeader={false} Component={Login} />} />
          <Route path='/signup' element={<ComponentWrapper showHeader={false} Component={SignUp} />} />
          <Route path='/home' element={<ComponentWrapper showHeader={true} Component={Home} />} />
          <Route path='/edit-task/:id' element={<ComponentWrapper showHeader={true} Component={EditTask} />} />
          <Route path='/profile' element={<ComponentWrapper showHeader={true} Component={Profile} />} />
          <Route path='/about' element={<ComponentWrapper showHeader={true} Component={About} />} />
          <Route path='/*' element={<><h1 className="flex justify-center items-center font-bold text-3xl h-screen">Not Found</h1></>} />
        </Routes>
      </BrowserRouter>
    </TaskState>
  );
}

function ComponentWrapper({ showHeader, Component }) {
  return (
    <>
    
      <ToastContainer limit={6} />

      {showHeader && <Header />}
      <div className="">
        <Component />
      </div>
    </>
  );
}

export default App;
