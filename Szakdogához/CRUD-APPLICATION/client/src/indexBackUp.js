import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import CreateArticle from "./routes/createArticle";
import EditArticle from "./routes/editArticle"
import Users from "./routes/users";
import All from "./routes/all";
import Registration from "./routes/registration";
import Login from "./routes/login";
import ProfilePage from "./routes/profilePage";
import Articles from "./routes/articles";

const rootElement = document.getElementById("root");
render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        <Route path="articles" element={<Articles />}></Route>
        <Route path="createArticle" element={<CreateArticle />}></Route>
        <Route path="editArticle" element={<EditArticle />}></Route>
        <Route path="profilePage" element={<ProfilePage />}></Route>
        <Route path="users" element={<Users />}></Route>
        <Route path="all" element={<All />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);