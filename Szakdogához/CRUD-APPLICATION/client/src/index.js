import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Post from "./routes/createArticle";
import Admins from "./routes/admins";
import Users from "./routes/users";
import All from "./routes/all";
import Registration from "./routes/registration";
import Login from "./routes/login";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        <Route path="createArticle" element={<Post />}></Route>
        <Route path="admins" element={<Admins />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="all" element={<All />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
