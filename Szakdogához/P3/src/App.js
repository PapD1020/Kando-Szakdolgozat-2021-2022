import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

const App = () => {

  const [user, setUser] = useState(null);

  return(
    <Routes>
      {!user && (
        <Route path="/auth" element={<Auth authenticate={() => setUser(true)}/>}></Route>
      )}
      
      <Route path="/profile" element={<Profile logout={() => setUser(false)}/>}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App;
