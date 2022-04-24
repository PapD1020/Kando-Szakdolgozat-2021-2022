import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function CreateArticle(){

    const [ArticleName, setArticleName] = useState('');
    const [ArticleSmDescr, setArticleSmDescr] = useState('');
    const [ArticleMDescr, setArticleMDescr] = useState('');
    const [ArticleImg, setArticleImg] = useState('');
    const [ArticleType, setArticleType] = useState('');
    const [LoginStatus, setLoginStatus] = useState('');

    const [Message, setMessage] = useState('');
    const [MessageError, setMessageError] = useState('');

    Axios.defaults.withCredentials = true;

    const GotUserId = useRef(null);

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = () => {
        submitArticleData();
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {

            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
                GotUserId.current = response.data.user[0].UserId;
            }
        });
    }, []);

    const submitArticleData = () => {

        Axios.post('http://localhost:3001/api/insert/article/byId', {
          userId: GotUserId.current,
          articleName: ArticleName,
          articleSmDescr: ArticleSmDescr,
          articleMDescr: ArticleMDescr,
          articleImg: ArticleImg,
          articleType: ArticleType,
          articleCreatedAt: date,
          articleUpdatedAt: date
      }).then((response) => {
          setMessage(response.data.message);
          handleShowSucUpd();
        }).catch((error) => {
            setMessageError(error.response.data.message);
            handleShowError();
        })
    };

    const [showSucUpd, setShowSucUpd] = useState(false);

    const handleCloseSucUpd = () => setShowSucUpd(false);
    const handleShowSucUpd = () => setShowSucUpd(true);

    const [showError, setShowError] = useState(false);

    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    let navigate = useNavigate();
    const routeChange = () =>{
      navigate('/chooseArticle');
    }

    return(
        <div className="ms-3">
            <div className="col-md-auto">
                <h1 className="display-1 m-3">Create Article</h1>
            </div>

            {LoginStatus && (
                <div className="container">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Article type:</label>
                                    <select id="types" className="form-control p-2 mb-3"{
                                        ...register("articleType", {
                                            required: true,
                                        })
                                    } onChange={(e) => {
                                        setArticleType(e.target.value);
                                    }}>
                                        <option value="" defaultValue={"Select the article type"}>Select the article type</option>
                                        <option value="Programming">Programming</option>
                                        <option value="Programming">Other</option>
                                    </select>
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.articleType?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a type.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Article name:</label>
                                    <input type="text" className="mb-3 p-2 form-control"{
                                        ...register("articleName", {
                                            required: true,
                                            minLength: 1,
                                            maxLength: 100
                                        })
                                    } onChange={(e) => {
                                        setArticleName(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.articleName?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a name.</p></div>}
                                    {errors?.articleName?.type === "minLength" && <div><h5>Your article's name is too short.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                                    {errors?.articleName?.type === "maxLength" && <div><h5>Your article's name is too long.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                                    {errors?.articleName?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label className="display-6 mb-3">Article image:</label>
                                    <input type="url" className="mb-3 p-2 form-control"{
                                        ...register("articleImg", {
                                            minLength: 1,
                                            maxLength: 500
                                        })
                                    } onChange={(e) => {
                                        setArticleImg(e.target.value);
                                    }}/>
                                </div>

                                <div className="errordiv text-danger mb-2">
                                    {errors?.articleImg?.type === "minLength" && <div><h5>Your article's picture URL is too short.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                                    {errors?.articleImg?.type === "maxLength" && <div><h5>Your article's picture URL is too long.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label className="display-5 mb-3 mt-3">Article small description:</label>
                                    <textarea rows="3" className="mb-3 p-2 form-control"{
                                        ...register("articleSmDescr", {
                                            required: true,
                                            minLength: 10,
                                            maxLength: 100
                                        })
                                    } onChange={(e) => {
                                        setArticleSmDescr(e.target.value);
                                    }}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="errordiv text-danger mb-2">
                                    {errors?.articleSmDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a small description of your article.</p></div>}
                                    {errors?.articleSmDescr?.type === "minLength" && <div><h5>Your article's small description is too short.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                                    {errors?.articleSmDescr?.type === "maxLength" && <div><h5>Your article's small description is too long.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                                    {errors?.articleSmDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="form-group">
                                    <label className="display-5 mb-3 mt-3">Article main description:</label>
                                    <textarea rows="10" cols="170" className="mb-3 p-2 form-control"{
                                        ...register("articleMDescr", {
                                            required: true,
                                            minLength: 1,
                                            maxLength: 1000
                                        })
                                    } onChange={(e) => {
                                        setArticleMDescr(e.target.value);
                                    }}/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-auto">
                                <div className="errordiv text-danger mb-2">
                                    {errors?.articleMDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a main description of your article.</p></div>}
                                    {errors?.articleMDescr?.type === "minLength" && <div><h5>Your article's main description is too short.</h5><p>Your article's main description length must be between 50 and 1000 characters.</p></div>}
                                    {errors?.articleMDescr?.type === "maxLength" && <div><h5>Your article's main description is too long.</h5><p>Your article's main description length must be between 50 and 1000 characters.</p></div>}
                                    {errors?.articleMDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 mb-5">
                            <div className="col-sm-auto">
                                <input className="btn btn-outline-primary" type="submit" value={"Create Article"}/>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <Modal className="text-success" show={showSucUpd} onHide={handleCloseSucUpd}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ArticleName} {Message}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleCloseSucUpd(); routeChange();}}>
                    Let's check it
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal className="text-danger" show={showError} onHide={handleCloseError}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{MessageError}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleCloseError();}}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}