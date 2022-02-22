import './App.css';
import {Outlet, Link} from 'react-router-dom';

export default function App(){
  return(
    <div className='App'>
      <h1>CRUD-APPLICATION WITH ROUTER V6</h1>
      <nav>
        <Link to="/post">Post</Link> | {" "}
        <Link to="/admin">Admin</Link> | {" "}
        <Link to="/users">Users</Link> | {" "}
        <Link to="/all">All</Link>
      </nav>
      <Outlet />
    </div>
  );
};
