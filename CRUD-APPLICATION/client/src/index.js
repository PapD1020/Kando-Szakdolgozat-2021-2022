import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";

import Registration from "./routes/registration";
import Login from "./routes/login";
import UsersList from "./routes/userlist";
import PostList from "./routes/articleslist";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="registration" element={<Registration />}></Route>
        
        <Route path="articleslist" element={<PostList />}></Route>
     
     
        <Route path="userlist" element={<UsersList />}></Route>
       
        {/* <Route path="all" element={<All />}></Route> */}

      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
