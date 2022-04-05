import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import CreateArticle from "./routes/createArticle";
import EditArticle from "./routes/editArticle"
import Registration from "./routes/registration";
import Login from "./routes/login";
import ProfilePage from "./routes/profilePage";
import Articles from "./routes/articles";
import ProtectedRoutes from "./ProtectedRoutes";
import ChooseArticles from "./routes/chooseArticles"


const rootElement = document.getElementById("root");

render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        <Route element={<ProtectedRoutes/>}>
          <Route path="articles" element={<Articles />}></Route>
          <Route path="createArticle" element={<CreateArticle />}></Route>
          <Route path="chooseArticle" element={<ChooseArticles />}></Route>
          <Route path="editArticle" element={<EditArticle />}></Route>
          <Route path="profilePage" element={<ProfilePage />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
