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
        <Link to="/createArticle">Create Article</Link> | {" "}
        <Link to="/editArticle">Edit Article</Link> | {" "}
        <Link to="/profilePage">Profile Page</Link> | {" "}
        <Link to="/admins">Admin</Link> | {" "}
        <Link to="/users">Users</Link> | {" "}
        <Link to="/all">All</Link>
      </nav>
      <Outlet />
    </div>
  );
};