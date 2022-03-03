import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet, Link} from 'react-router-dom';

export default function App(){
  return(
    <div className='App'>
      <h1>CRUD-APPLICATION WITH ROUTER V6</h1>
      <nav>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/registration">Registration</Link> | {" "}
        <Link to="/createPost">Create Post</Link> | {" "}
        <Link to="/admin">Admin</Link> | {" "}
        <Link to="/users">Users</Link> | {" "}
        <Link to="/all">All</Link>
      </nav>
      <Outlet />
    </div>
  );
};