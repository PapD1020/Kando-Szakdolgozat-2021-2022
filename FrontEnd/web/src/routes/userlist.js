 import React, {useState, useEffect} from "react";
 import '../App.css';
import Axios from 'axios';
import { useForm } from "react-hook-form";
 import * as ReactBootStrap from "react-bootstrap";
 import { Button,Modal } from "react-bootstrap";
 import {useNavigate} from "react-router-dom";

 export default function UsersList(){
 
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const [search,setSearch] =useState('');
 const [record,setRecord] = useState([]);
   
  var UserUn ='';
  var UserPw ='';
  var UserPP ='';

  var UserFN ='';
  var UserSN ='';
  var UserDob ='';
  var UserPL ='';
  var UserEmail='';

  

    const [UsersNameList, setUsersNameList] = useState([]);

    const [NewUserEmail, setNewUserEmail] = useState('');
     const [UsersNameSettings, setUsersNameSettings] = useState([]);
    const current = new Date();
     const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    //On page load get users
   useEffect(() => {

  Axios.get('http://localhost:3001/api/get/user').then((response) => {
     setUsersNameList(response.data);
    
    });
    }, []);


     const UserSetting = (userId) =>{
       setShow(true);
    Axios.get(`http://localhost:3001/api/get/user/${userId}`).then((response) => {
  
     setUsersNameSettings(response.data);
      //console.log(response.data); //console logging the SELECT * FROM post to the frontend terminal
     })};
     
    //GET - USERS
    const refreshUserData = () => {
      Axios.get('http://localhost:3001/api/get/user').then((response) => {
      setUsersNameList(response.data);
    });
   };
  
  
  
   //DELETE - USERS
  const deleteUser = (userId) =>{
    Axios.delete(`http://localhost:3001/api/delete/user/${userId}`); // with altgr+7 you can add variables to it
  
   alert("Successfuly deleted. Please click on the refresh button.")
    //kell frissítés, hogy eltünjön a törölt, submitos nem működik
  };

    // Search Records here 
    const searchRecords = () =>
    {
        Axios.get(`http://localhost:3001/api/get/user/search/${search}`) .then(response => {
          console.log(search);
          setRecord(response.data);
          console.log(record);
        });
         
    }
  
  //PUT - USERS
  const updateUser = (userid) =>{
     Axios.put('http://localhost:3001/api/update/user', {
      userId: userid,
      userUn: UserUn,
      userPP: UserPP,
      userPw: UserPw,
      userFN: UserFN,
      userSN: UserSN,
      userDob: UserDob,
      userPL: UserPL,
      userEmail: UserEmail,
      userUpdatedAt: date
    });
  
    alert("Successfuly changed! Please click on the refresh button.");
    setShow(false);
    refreshUserData();
   };
   const UserPLView=(UserPL)=>{
    if(UserPL==-2){UserPL = "Törölt"}
    if(UserPL==-1){UserPL = "Felfüggesztett"}
    if(UserPL==0){UserPL = "Inaktív"}
    if(UserPL==1){UserPL = "Aktív"}
    if(UserPL==9){UserPL = "Admin"}

  
    return UserPL;
  }

   let navigate = useNavigate();
   const routeChange = (gotId) =>{
     alert("Második selected got id: " + gotId);
     navigate('/adminEditUser', {state:{id: gotId}});
   }
   return(
   <div >
    
    <input type="text" id="form"  onKeyUp={searchRecords} onChange={(e)=>setSearch(e.target.value)} class="form-control" placeholder="Search" style={{backgroundColor:"#ececec"}}/>
                    <ReactBootStrap.Table striped bordered hover > 
                         <thead className="tabla">
                                <tr>
                                    <th>Username</th>
                                    <th>First name</th>
                                    <th>Second name</th>
                                    <th>Date of birth</th>
                                    <th>Permisson</th>
                                    <th>Image</th>
                                    <th>Email</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                    <th>Operation</th>
                                 </tr>
                         </thead>
                         
                   { search.length==0 ? UsersNameList.map((val) => {
                   
                      return(
                              
                          <tbody>
                            <tr>
                              <td>{val.UserUn}</td>    
                              
                              <td>{val.UserFN}</td>  
                              <td>{val.UserSN}</td>  
                              <td>{val.UserDob}</td>  
                              <td>{UserPLView(val.UserPL)}</td>  
                              <td><img src={val.UserPP} style={{ width: "30%" }} alt={val.UserPP} /></td>
                              <td>{val.UserEmail}</td>  
                              <td>{val.UserCreatedAt}</td>  
                              <td>{val.UserUpdatedAt}</td> 
                           
                           <td>
                          

                           <td><Button variant="primary" onClick={() => {routeChange(val.UserId)}}>Settings</Button></td>
                           <td><Button onClick={() => {deleteUser(val.UserId)}}>Delete User</Button></td>
                          
                          
                          </td>
                          </tr> 
                          </tbody>
                         
                      
                       )
                   })
                   : search.length!=0 && record.map((val) => {
                   
                    return(
                            
                        <tbody>
                          <tr>
                            <td>{val.UserUn}</td>    
                            
                            <td>{val.UserFN}</td>  
                            <td>{val.UserSN}</td>  
                            <td>{val.UserDob}</td>  
                            <td>{UserPLView(val.UserPL)}</td>  
                            <td><img src={val.UserPP} style={{ width: "30%" }} alt={val.UserPP} /></td>
                            <td>{val.UserEmail}</td>  
                            <td>{val.UserCreatedAt}</td>  
                            <td>{val.UserUpdatedAt}</td> 
                         
                         <td>
                        

                         <td><Button variant="primary" onClick={() => {routeChange(val.UserId)}}>Settings</Button></td>
                         <td><Button onClick={() => {deleteUser(val.UserId)}}>Delete User</Button></td>
                        
                        
                        </td>
                        </tr> 
                        </tbody>
                       
                    
                     )
                 })}
               </ReactBootStrap.Table>    
          
      </div>
   );
 } 