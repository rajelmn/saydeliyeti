import SideBar from './components/sidebar';
import { Outlet } from 'react-router-dom';
import './App.css';
// import { useState } from 'react';

function App() {
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  return (
    <div className='flex w-screen'>
    <SideBar />
    <Outlet />
     </div>
  )
}

export default App
