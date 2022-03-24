import './App.css';
import {Outlet, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar';

export default function App(){
  return(
    <div className='App'>
      <Topbar/>
      
      <Outlet />
    </div>
  );
};
