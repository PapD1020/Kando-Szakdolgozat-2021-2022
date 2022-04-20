import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import CreateArticle from "./routes/createArticle";
import EditArticle from "./routes/editArticle"
import ProfilePage from "./routes/profilePage";
import Articles from "./routes/articles";
import ProtectedRoutes from "./ProtectedRoutes";
import ChooseArticles from "./routes/chooseArticles";
import ArticlesList from "./routes/articleslist";
import CommentList from "./routes/commentlist";
import UserList from "./routes/userlist";
import AdminEditArticle from "./routes/adminEditArticle";
import AdminEditUser from "./routes/adminEditUser";


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
          <Route path="articlelist" element={<ArticlesList />}></Route>
          <Route path="commentlist" element={<CommentList />}></Route>
          <Route path="userlist" element={<UserList />}></Route>
          <Route path="adminEditArticle" element={<AdminEditArticle />}></Route>
          <Route path="adminEditUser" element={<AdminEditUser />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

