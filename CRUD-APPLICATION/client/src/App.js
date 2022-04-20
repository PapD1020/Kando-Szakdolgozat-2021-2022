import './App.css';
import {Outlet, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function App(){
  return(
    <div className='App'>
      <Topbar/>
      
      <Outlet />
    </div>
  );
};
