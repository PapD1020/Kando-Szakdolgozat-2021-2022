import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet, Link} from 'react-router-dom';

export default function App(){

  /*
  const [AuthStatus, setAuthStatus] = useState(false);

  userAuthenticated = () => {
    Axios.get('http://localhost:3001/api/login/user/auth', {headers: {
        "x-access-token": localStorage.getItem("token")
    }}).then((response) => {
        setAuthStatus(true);
        alert("Auth status: " + AuthStatus);
        console.log("isUserAuth response: " + JSON.stringify(response.data));
    });
  };
 */

  return(
    <div className='App'>
      <h1>CRUD-APPLICATION WITH ROUTER V6</h1>
      <nav>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/registration">Registration</Link> | {" "}
        <Link to="/articles">Articles</Link> | {" "}
        <Link to="/createArticle">Create Article</Link> | {" "}
        <Link to="/chooseArticle">Choose article for editing Article</Link> | {" "}
        <Link to="/profilePage">Profile Page</Link> | {" "}
        <Link to="/users">Users</Link> | {" "}
        <Link to="/all">All</Link>
      </nav>
      <Outlet />
    </div>
  );
};