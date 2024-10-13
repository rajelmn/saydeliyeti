import SideBar from './components/sidebar';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='flex'>
    <SideBar />
    <Outlet />
     </div>
  )
}

export default App
