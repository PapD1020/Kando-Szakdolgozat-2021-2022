import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import CreateArticle from "./routes/createArticle";
import EditArticle from "./routes/editArticle"
import ProfilePage from "./routes/profilePage";
import Articles from "./routes/articles";
import ProtectedRoutes from "./ProtectedRoutes";
import ChooseArticles from "./routes/chooseArticles"
import AdminEditArticle from "./routes/adminEditArticle";
import AdminEditUser from "./routes/adminEditUser";
import Commentlist from "./routes/commentlist";
import UsersList from "./routes/userlist";
import PostList from "./routes/articleslist";

const rootElement = document.getElementById("root");

render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route element={<ProtectedRoutes/>}>
          <Route path="articles" element={<Articles />}></Route>
          <Route path="createArticle" element={<CreateArticle />}></Route>
          <Route path="chooseArticle" element={<ChooseArticles />}></Route>
          <Route path="editArticle" element={<EditArticle />}></Route>
          <Route path="profilePage" element={<ProfilePage />}></Route>
          <Route path="adminEditArticle" element={<AdminEditArticle />}></Route>
          <Route path="adminEditUser" element={<AdminEditUser />}></Route>
          <Route path="commentlist" element={<Commentlist />}></Route>
          <Route path="articleslist" element={<PostList />}></Route>
          <Route path="userlist" element={<UsersList />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

