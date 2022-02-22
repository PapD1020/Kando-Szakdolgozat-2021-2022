import React, {useState, useEffect} from "react";
import '../App.css';
import Axios from 'axios';

export default function Admin(){
    const [AdminUn, setAdminUn] = useState('');
    const [AdminPw, setAdminPw] = useState('');
    const [AdminFN, setAdminFN] = useState('');
    const [AdminSN, setAdminSN] = useState('');
    const [AdminPermL, setAdminPermL] = useState('');
    const [AdminEmail, setAdminEmail] = useState('');

    const [AdminNameList, setAdminNameList] = useState([]);

    const [NewAdminPermL, setNewAdminPermL] = useState('');

    //On page load get admins
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/admin').then((response) => {
  
      setAdminNameList(response.data);
    });
    }, []);

    //GET - ADMIN
    const refreshAdminData = () => {
    Axios.get('http://localhost:3001/api/get/admin').then((response) => {
  
      setAdminNameList(response.data);
    });
  };
  
  //POST - ADMIN
  const submitAdminData = () => {
  
    //postName - backend variable name
    Axios.post('http://localhost:3001/api/insert/admin', { //URL for our api (node.js backend)
        adminUn: AdminUn, adminPw: AdminPw, adminFN: AdminFN, adminSN: AdminSN, adminPermL: AdminPermL, adminEmail: AdminEmail
    });
      
    setAdminNameList([
      ...AdminNameList,
      {AdminUn: AdminUn, AdminPw: AdminPw, AdminFN: AdminFN, AdminSN: AdminSN, AdminPermL: AdminPermL, AdminEmail: AdminEmail}, //Valamiért mind a kettőt nagy P-vel kell írni, az első értékeket, azaz nem postName: PostName
    ]);
  };
  
  //DELETE - ADMIN
  const deleteAdmin = (admin) =>{
    Axios.delete(`http://localhost:3001/api/delete/admin/${admin}`); // with altgr+7 you can add variables to it
  
    alert("Successfuly deleted. Please click on the refresh button.")
    //kell frissítés, hogy eltünjön a törölt, submitos nem működik
  };
  
  //PUT - ADMIN
  const updateAdminPermL = (admin) =>{
    Axios.put('http://localhost:3001/api/update/admin', {
      adminUn: admin,
      adminPermL: NewAdminPermL,
    });
    setNewAdminPermL("");
    alert("Successfuly changed! Please click on the refresh button.");
  };

  return(
    <div className="smallContainer">
          <div className='form'>
            <h3>ADMIN</h3>
                <label>AdminUn</label>
                <input type="text" name="adminUn" onChange={(e) => {
                  setAdminUn(e.target.value);
                }}></input>

                <label>AdminPw</label>
                <input type="password" name="adminPw" onChange={(e) => {
                  setAdminPw(e.target.value);
                }}></input>

                <label>AdminFN</label>
                <input type="text" name="adminFN" onChange={(e) => {
                  setAdminFN(e.target.value);
                }}></input>

                <label>AdminSN</label>
                <input type="text" name="adminSN" onChange={(e) => {
                  setAdminSN(e.target.value);
                }}></input>

                <label>AdminPermL</label>
                <input type="number" name="adminPermL" onChange={(e) => {
                  setAdminPermL(e.target.value);
                }}></input>

                <label>AdminEmail</label>
                <input type="text" name="adminEmail" onChange={(e) => {
                  setAdminEmail(e.target.value);
                }}></input>

                <button className="btn" onClick={submitAdminData}>Add Admin</button>
                <button className="btn" onClick={refreshAdminData}>Refresh Admin data</button>

                <div className="cardContainer">
                  {AdminNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>Admin username: {val.AdminUn}</h1>
                          <p>Admin password: {val.AdminPw}</p>
                          <h2>Admin first name: {val.AdminFN}</h2>
                          <p>Admin second name: {val.AdminSN}</p>
                          <p>Admin permission level: {val.AdminPermL}</p>
                          <p>Admin email: {val.AdminEmail}</p>

                          <button onClick={() => {deleteAdmin(val.AdminUn)}}>Delete Admin</button>

                          <input type="number" className="updateInput" onChange={(e) => {
                            setNewAdminPermL(e.target.value);
                          }}></input>

                          <button onClick={() => {updateAdminPermL(val.AdminUn)}}>Update Admin</button>
                        </div>
                      )
                  })}
                </div>
          </div>
        </div>
  );
}