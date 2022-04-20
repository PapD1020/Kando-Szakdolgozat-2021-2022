import React, {useEffect, useState, useRef} from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";

export default function ProfileUpdate(){

    //Id vigygálata, átadása
    //Validációja a beviteli mezőknek

    const [UserPPUpd, setUserPPUpd] = useState('');
    const [UserPwUpd, setUserPwUpd] = useState('');
    const [UserFNUpd, setUserFNUpd] = useState('');
    const [UserSNUpd, setUserSNUpd] = useState('');
    const [UserEmailUpd, setUserEmailUpd] = useState('');

    const [UsersNameList, setUsersNameList] = useState([]);

    const GotUserId = useRef(null);


    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm({});

    const onSubmit = () => {
        alert("asd");
        submitUserDataUpd();
        modalClose();
    };

    const onSubmitPw = () => {
        changePassword();
        modalClosePw();
    };

    const password = useRef({});
    password.current = watch("firstPw", "");

    Axios.defaults.withCredentials = true;


    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {

            if(response.data.loggedIn === true){
                GotUserId.current = response.data.user[0].UserId;
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
        });
    }, []);

    const refreshUserData = () => {
        Axios.get("http://localhost:3001/api/get/userById",{
            headers: {
                'content-type': "application/json",
                'userIdUpd': GotUserId.current
                }
            }).then((response) => {
                setUsersNameList(response.data)
            });
    }


    const submitUserDataUpd = () => {
  
        Axios.put(`http://localhost:3001/api/update/user/userId`, { 
        userId: GotUserId.current,
        userPP: UserPPUpd,
        userFN: UserFNUpd,
        userSN: UserSNUpd,
        userEmail: UserEmailUpd,
        userUpdatedAt: date

        }).then((response) => 
            console.log("Update user response: " + JSON.stringify(response)),
            refreshUserData()
        );
        //alert("Successfully updated as: " + GotUserId.current);
    };

    const changePassword = () => {
        Axios.put('http://localhost:3001/api/update/user/password', {
            userId: GotUserId.current,
            userPw: UserPwUpd,
            userUpdatedAt: date
        }).then((response) => 
            console.log("Updated user password response: " + response)
        );
    }

    const [ModalState, setModalState] = useState(false);

    const modalClose = () => setModalState(false);

    const modalOpen = () => setModalState(true);

    const [ModalStatePw, setModalStatePw] = useState(false);

    const modalClosePw = () => setModalStatePw(false);

    const modalOpenPw = () => setModalStatePw(true);

    return(
        <div>
          {UsersNameList.map((val) => {
                      return(
                        <div className="text-center">

                            <div className="card border-primary m-5">
                            <div className="card-header mb-3">{val.UserUn}'s profile</div>
                            <div className="card-text">Profile picture: <img className="card-img-top w-25" src={val.UserPP} alt="User profile pic"></img></div>
                            
                                <div className="card-body">
                                    <h5 className="card-title">User name: {val.UserUn}</h5>
                                    <p className="card-text">User first name: {val.UserFN}</p>
                                    <p className="card-text">User second name: {val.UserSN}</p>
                                    <p className="card-text">User date of birth: {val.UserDob}</p>
                                    <p className="card-text">User email: {val.UserEmail}</p>
                                    <p className="card-text">User created at: {val.UserCreatedAt}</p>
                                    <p className="card-text">User updated at: {val.UserUpdatedAt}</p>
                                </div>
                                <div className="card-footer">
                                        <div className="mb-3">
                                            <Button variant="outline-primary" onClick={modalOpenPw}>
                                                Change password
                                            </Button>
                                        </div>

                                        <div>
                                            <Button variant="outline-primary" onClick={modalOpen}>
                                                Edit your profile
                                            </Button>
                                        </div>
                                    </div>
                            </div>

                            <Modal show={ModalStatePw} onHide={modalClosePw}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Changing password</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                    <form onSubmit={handleSubmit(onSubmitPw)}>

                                        <div className="form-group">
                                            <label>New password: </label>
                                            <input name="password" type="password" className="form-control" {
                                                ...register("firstPw", {
                                                    required: true,
                                                    minLength: 8,
                                                    maxLength: 16
                                                })
                                            }/>

                                            {errors?.firstPw?.type === "required" && <div><h5>This field is required!</h5><p>Your must have a password!</p></div>}
                                            {errors?.firstPw?.type === "minLength" && <div><h5>Your password is too short.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                            {errors?.firstPw?.type === "maxLength" && <div><h5>Your password is too long.</h5><p>Your password length must be between 8 and 16 characters.</p></div>}
                                        </div>

                                        <div className="form-group">
                                            <label>Password again: </label>
                                            <input type="password" className="form-control" {
                                                ...register("secondPw", {
                                                    validate: value => value === password.current
                                                })
                                            }onChange={(e) => {
                                                setUserPwUpd(e.target.value);
                                            }}/>

                                            {errors?.secondPw?.type === "validate" && <div><h5>Passwords must match!</h5></div>}
                                    
                                        </div>

                                        <div className="mt-5">
                                            <Button type="submit">Submit</Button>
                                        </div>
                                        </form>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="outline-secondary" onClick={modalClosePw}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={ModalState} onHide={modalClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Editing {val.UserUn}'s profile</Modal.Title>
                                </Modal.Header>

                              <Modal.Body>
                              {UsersNameList.map((val) => {
                                return(
                                    <form onSubmit={handleSubmit(onSubmit)}>
        
                                    <div className="form-group">
                                        <label>User name:</label>
                                        <input type="text" className="form-control" disabled={true} placeholder={val.UserUn}></input>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>User profile picture:</label>
                                        <input type="url" className="form-control" defaultValue={val.UserPP}{
                                            ...register("userPPUpd", {
                                                minLength: 3,
                                                maxLength: 200,
                                            })
                                        }onChange={(e) => {
                                            setUserPPUpd(e.target.value);
                                        }}/>
                        
                                        {errors?.userPPUpd?.type === "minLength" && <div><h5>The URL is too short.</h5><p>Your URL length must be between 3 and 200 characters.</p></div>}
                                        {errors?.userPPUpd?.type === "maxLength" && <div><h5>The URL is too long.</h5><p>Your URL length must be between 3 and 200 characters.</p></div>}
                                    </div>
                        
                                    <div className="form-group">
                                        <label>User password:</label>
                                        <input type="text" className="form-control" disabled={true} placeholder="You can not change your password here"></input>
                                    </div>
                        
                                    <div className="form-group">
                                        <label>User first name:</label>
                                        <input type="text" className="form-control" defaultValue={val.UserFN}{
                                            ...register("userFNUpd", {
                                                required: false,
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
                                                required: false,
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
                                                required: false
                                            })
                                        }onChange={(e) => {
                                            setUserEmailUpd(e.target.value);
                                        }}/>
                                    </div>
                        
                                    <div className="mt-5">
                                        <Button type="submit" onClick={() => {
                                            if(UserPPUpd === ""){setUserPPUpd(val.UserPP)}
                                            if(UserFNUpd === ""){setUserFNUpd(val.UserFN)}
                                            if(UserSNUpd === ""){setUserSNUpd(val.UserSN)}
                                            if(UserEmailUpd === ""){setUserEmailUpd(val.UserEmail)}
                                        }}>Submit</Button>
                                    </div>
                                </form>
                                  ) 
                                })}
                              </Modal.Body>
                            
                              <Modal.Footer>
                                <Button variant="outline-secondary" onClick={modalClose}>
                                  Close
                                </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      )
                  })}
        </div>
    );
}