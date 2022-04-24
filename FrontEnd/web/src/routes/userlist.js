 import React, {useState, useEffect} from "react";
 import '../App.css';
import Axios from 'axios';

 import * as ReactBootStrap from "react-bootstrap";
 import { Button} from "react-bootstrap";
 import {useNavigate} from "react-router-dom";

 export default function UsersList(){
 


 const [search,setSearch] =useState('');
 const [record,setRecord] = useState([]);
 
  

    const [UsersNameList, setUsersNameList] = useState([]);

   
  
    //On page load get users
   useEffect(() => {

  Axios.get('http://localhost:3001/api/get/user').then((response) => {
     setUsersNameList(response.data);
    
    });
    }, []);


     
     
    //GET - USERS
    const refreshUserData = () => {
      Axios.get('http://localhost:3001/api/get/user').then((response) => {
      setUsersNameList(response.data);
    });
   };
  
  
  
   //DELETE - USERS
  const deleteUser = (userId) =>{
    Axios.delete(`http://localhost:3001/api/delete/user/${userId}`).then(() => {  // with altgr+7 you can add variables to it
    refreshUserData();
    });
  };

    // Search Records here 
    const searchRecords = () =>
    {
        Axios.get(`http://localhost:3001/api/get/user/search/${search}`).then(response => {
         
          setRecord(response.data);
      
        });
         
    }
  
  
   const UserPLView=(UserPL)=>{
    if(UserPL===-2){UserPL = "Törölt"}
    if(UserPL===-1){UserPL = "Felfüggesztett"}
    if(UserPL===0){UserPL = "Inaktív"}
    if(UserPL===1){UserPL = "Aktív"}

  
    return UserPL;
  }

   let navigate = useNavigate();
   const routeChange = (gotId) =>{
    
     navigate('/adminEditUser', {state:{id: gotId}});
   }
   return(
   <div >
    
         <ReactBootStrap.Table responsive bordered hover > 
                         <thead >
                                <tr className="none">
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
                                 <th colSpan={10}>
                                 <input type="text" id="form"  onKeyUp={searchRecords} onChange={(e)=>setSearch(e.target.value)} class="form-control" placeholder="Search" style={{backgroundColor:"#ececec"}}/>
 
                                 </th>
                         </thead>
                         
                   { search.length===0 ? UsersNameList.map((val) => {
                   
                      return(
                              
                          <tbody>
                            <tr>
                              <td><td className="td-none">Username:</td>{val.UserUn}</td>    
                              <td><td className="td-none">First name:</td>{val.UserFN}</td>  
                              <td><td className="td-none">Second name:</td>{val.UserSN}</td>  
                              <td><td className="td-none">Date of birth:</td>{val.UserDob}</td>  
                              <td><td className="td-none">Permisson:</td>{UserPLView(val.UserPL)}</td>  
                              <td><td className="td-none">Image:</td><img src={val.UserPP}  alt={val.UserPP}></img></td>
                              <td><td className="td-none">Email:</td>{val.UserEmail}</td>  
                              <td><td className="td-none">Created at:</td>{val.UserCreatedAt}</td>  
                              <td><td className="td-none">Updated at:</td>{val.UserUpdatedAt}</td> 
                           
                           <td>
                          

                           <td><Button variant="primary" onClick={() => {routeChange(val.UserId)}}>Settings</Button></td>
                           <td><Button onClick={() => {deleteUser(val.UserId)}}>Delete </Button></td>
                          
                          
                          </td>
                          </tr> 
                          </tbody>
                         
                      
                       )
                   })
                   : search.length!==0 && record.map((val) => {
                   
                    return(
                            
                        <tbody>
                          <tr>
                          <td><td className="td-none">Username:</td>{val.UserUn}</td>    
                              <td><td className="td-none">First name:</td>{val.UserFN}</td>  
                              <td><td className="td-none">Second name:</td>{val.UserSN}</td>  
                              <td><td className="td-none">Date of birth:</td>{val.UserDob}</td>  
                              <td><td className="td-none">Permisson:</td>{UserPLView(val.UserPL)}</td>  
                              <td><td className="td-none">Image:</td><img src={val.UserPP}  alt={val.UserPP}></img></td>
                              <td><td className="td-none">Email:</td>{val.UserEmail}</td>  
                              <td><td className="td-none">Created at:</td>{val.UserCreatedAt}</td>  
                              <td><td className="td-none">Updated at:</td>{val.UserUpdatedAt}</td> 
                         
                         <td>
                        

                         <td><Button variant="primary" onClick={() => {routeChange(val.UserId)}}>Settings</Button></td>
                         <td><Button onClick={() => {deleteUser(val.UserId)}}>Delete </Button></td>
                        
                        
                        </td>
                        </tr> 
                        </tbody>
                       
                    
                     )
                 })}
               </ReactBootStrap.Table>    
          
      </div>
   );
 } 