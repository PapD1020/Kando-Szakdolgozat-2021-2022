import React, {useEffect, useState, useRef} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";

export default function ProfileUpdate(){

    //Id vigygálata, átadása
    //Validációja a beviteli mezőknek

    const [UserUnUpd, setUserUnUpd] = useState('');
    const [UserPPUpd, setUserPPUpd] = useState('');
    const [UserPwUpd, setUserPwUpd] = useState('');
    const [UserFNUpd, setUserFNUpd] = useState('');
    const [UserSNUpd, setUserSNUpd] = useState('');
    const [UserEmailUpd, setUserEmailUpd] = useState('');
    const [UsersNameList, setUsersNameList] = useState([]);

    const [LoginStatus, setLoginStatus] = useState('');

    const [UserUpdList, setUserUpdList] = useState([]);

    const GotUserId = useRef(null);


    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        submitUserDataUpd();
    };

    Axios.defaults.withCredentials = true;

    //check every time we refresh the page if a user is logged in
    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
            //ellenőrzésre
            //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
                GotUserId.current = response.data.user[0].UserId;
                //alert("response.data.user[0].UserId: " + response.data.user[0].UserId + " " + "UserId: " + GotUserId.current);
            }
        }).then(() => {
            Axios.get("http://localhost:3001/api/get/userById",{
            headers: {
                'content-type': "application/json",
                'userIdUpd': GotUserId.current
                }
            }).then((response) => {
                setUsersNameList(response.data)
            });

            alert("frontend userId: " + GotUserId.current);
        });
    }, []);

    //POST - USERS
    const submitUserDataUpd = (userId) => {
  
    //postName - backend variable name
        Axios.put(`http://localhost:3001/api/update/user/userId`, { //URL for our api (node.js backend)
        //userUn must be the same as in back-end index.js req.body.userUn !!!
        userId: GotUserId.current,
        userUn: UserUnUpd,
        userPP: UserPPUpd,
        userPw: UserPwUpd,
        userFN: UserFNUpd,
        userSN: UserSNUpd,
        userEmail: UserEmailUpd,
        userCreatedAt: date,
        userUpdatedAt: date

        }).then((response) => 
            console.log("Update user response: " + JSON.stringify(response))
        );
        alert("Successfully updated as maga a változó: " + GotUserId.current);
        alert("Successfully updated as: " + userId);
    };

    const [ModalState, setModalState] = useState(false);

    const modalClose = () => setModalState(false);

    const modalOpen = () => setModalState(true);

    return(
        <div>
          {UsersNameList.map((val) => {
                      return(
                        <div className="card">
                          <h1>User name: {val.UserUn}</h1>
                          <h2>User profile picture: {val.UserPP}</h2>
                          <p>User password: {val.UserPw}</p>
                          <p>User first name: {val.UserFN}</p>
                          <p>User second name: {val.UserSN}</p>
                          <p>User date of birth: {val.UserDob}</p>
                          <p>User email: {val.UserEmail}</p>
                          <p>User created at: {val.UserCreatedAt}</p>
                          <p>User updated at: {val.UserUpdatedAt}</p>

                          <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ height: "100vh" }}
                            >
                              
                              <Button variant="primary" onClick={modalOpen}>
                                  Edit
                              </Button>

                              <Modal show={ModalState} onHide={modalClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>

                              <Modal.Body>
                              {UsersNameList.map((val) => {
                                return(
                                    <form onSubmit={handleSubmit(onSubmit)}>
        
                                    <div className="form-group">
                                        <label>User name:</label>
                                        <input type="text" className="form-control" defaultValue={val.UserUn}{
                                            ...register("userUnUpd", {
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                                            })
                                        }onChange={(e) => {
                                            setUserUnUpd(e.target.value);
                                        }}/>
                                        
                                        {errors?.userUnUpd?.type === "minLength" && <div><h5>Your user name is too short.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                        {errors?.userUnUpd?.type === "maxLength" && <div><h5>Your user name is too long.</h5><p>Your user name length must be between 6 and 20 characters.</p></div>}
                                        {errors?.userUnUpd?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>User profile picture:</label>
                                        <input type="url" className="form-control" defaultValue={val.UserPP}{
                                            ...register("userPPUpd", {
                                                minLength: 8,
                                                maxLength: 100,
                                            })
                                        }onChange={(e) => {
                                            setUserPPUpd(e.target.value);
                                        }}/>
                        
                                        {errors?.userPPUpd?.type === "minLength" && <div><h5>The URL is too short.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
                                        {errors?.userPPUpd?.type === "maxLength" && <div><h5>The URL is too long.</h5><p>Your URL length must be between 8 and 100 characters.</p></div>}
                                    </div>
                        
                                    <div className="form-group">
                                        <label>User password: </label>
                                        <input type="password" className="form-control" defaultValue={val.UserPw}{
                                            ...register("userPwUpd", {
                                                minLength: 8,
                                                maxLength: 16,
                                            })
                                        }onChange={(e) => {
                                            setUserPwUpd(e.target.value);
                                        }}/>
                        
                                        {errors?.userPwUpd?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                        {errors?.userPwUpd?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                    </div>
                        
                                    <div className="form-group">
                                        <label>User first name:</label>
                                        <input type="text" className="form-control" defaultValue={val.UserFN}{
                                            ...register("userFNUpd", {
                                                minLength: 3, //Mennyi legyen?
                                                maxLength: 20, //Mennyi legyen?
                                            })
                                        }onChange={(e) => {
                                            setUserFNUpd(e.target.value);
                                        }}/>
                        
                                        {errors?.userFNUpd?.type === "minLength" && <div><h5>Your first name is too short.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                                        {errors?.userFNUpd?.type === "maxLength" && <div><h5>Your first name is too long.</h5><p>Your first name length must be between 150 and 500 characters.</p></div>}
                                    </div>
                        
                                    <div className="form-group">
                                        <label>User second name:</label>
                                        <input type="text" className="form-control" defaultValue={val.UserSN}{
                                            ...register("userSNUpd", {
                                                minLength: 3, //Mennyi legyen?
                                                maxLength: 20, //Mennyi legyen?
                                            })
                                        }onChange={(e) => {
                                            setUserSNUpd(e.target.value);
                                        }}/>
                        
                                        {errors?.userSNUpd?.type === "minLength" && <div><h5>Your second name is too short.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                        {errors?.userSNUpd?.type === "maxLength" && <div><h5>Your second name is too long.</h5><p>Your second name length must be between 3 and 20 characters.</p></div>}
                                    </div>
                        
                                    <div className="form-group">
                                        <label>User email: </label>
                                        <input type="email" className="form-control" defaultValue={val.UserEmail}{
                                            ...register("userEmailUpd", {
                                                //vmi must contain @ ellenőrzés stb
                                            })
                                        }onChange={(e) => {
                                            setUserEmailUpd(e.target.value);
                                        }}/>
                                    </div>
                        
                                    <input type="submit" /> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
                                </form>
                                  ) 
                                })}
                              </Modal.Body>
                            
                              <Modal.Footer>
                                <Button variant="secondary" onClick={modalClose}>
                                  Close
                                </Button>
                            </Modal.Footer>
                          </Modal>
                          </div>

                          
                        </div>
                      )
                  })}

            <h1>{LoginStatus}</h1>
        </div>
    );
}