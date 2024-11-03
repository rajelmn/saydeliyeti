import SideBar from './components/sidebar';
import { Outlet } from 'react-router-dom';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { useState } from 'react';

function App() {
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function validateUser() {
      const res = await fetch('/api/validateUser')
      if(!res.ok) {
        navigate('/login')
      }
    }
    validateUser()
  } ,[])
  return (
    <div className='flex w-screen'>
    <SideBar />
    <Outlet />
     </div>
  )
}

export default App
