import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Post from "./routes/post";
import Admin from "./routes/admin";
import Users from "./routes/users";
import All from "./routes/all";
import Registration from "./routes/registration";
import Login from "./routes/login";
import UsersList from "./routes/userlist";
import PostList from "./routes/postlist";
import Teszt from "./routes/teszt";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        <Route path="post" element={<Post />}></Route>
        <Route path="postlist" element={<PostList />}></Route>
        <Route path="admin" element={<Admin />}></Route>
        <Route path="users" element={<Users />}></Route>
        {/* <Route path="userlist" element={<UsersList />}></Route> */}
        <Route path="teszt" element={<Teszt />}></Route>
        <Route path="all" element={<All />}></Route>

      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
