import './App.css';
import {Outlet, Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(){
  return(
    <div className='App'>
      <h1>CRUD-APPLICATION WITH ROUTER V6</h1>
      <nav>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/registration">Registration</Link> | {" "}
        <Link to="/post">Post</Link> | {" "}
        <Link to="/postlist">PostList</Link> | {" "}
        <Link to="/admin">Admin</Link> | {" "}
        <Link to="/users">Users</Link> | {" "}
        <Link to="/all">All</Link> | {" "}
        <Link to="/userlist">userlist</Link>
      </nav>
      <Outlet />
    </div>
  );
};
