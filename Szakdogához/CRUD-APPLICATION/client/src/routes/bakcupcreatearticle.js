import React, {useState, useEffect, useRef} from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';

export default function CreateArticle(){

    const [ArticleName, setArticleName] = useState('');
    const [ArticleSmDescr, setArticleSmDescr] = useState('');
    const [ArticleMDescr, setArticleMDescr] = useState('');
    const [ArticleImg, setArticleImg] = useState('');
    const [ArticleType, setArticleType] = useState('');
  
    const [ArticleNameList, setArticleNameList] = useState([]);
    
    const [LoginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

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
        submitArticleData();
    };

    //check every time we refresh the page if a user is logged in
    useEffect(() => {
        Axios.get('http://localhost:3001/api/login/user').then((response) => {
        //ellenőrzésre
        //console.log("Are we logged in: " + JSON.stringify(response));
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user[0].UserUn);
                GotUserId.current = response.data.user[0].UserId;
            }
        });
    }, []);

    const submitArticleData = () => {

        //articleName - backend variable name
        Axios.post('http://localhost:3001/api/insert/article/byId', { //URL for our api (node.js backend)
          userId: GotUserId.current,
          articleName: ArticleName,
          articleSmDescr: ArticleSmDescr,
          articleMDescr: ArticleMDescr,
          articleImg: ArticleImg,
          articleType: ArticleType,
          articleCreatedAt: date,
          articleUpdatedAt: date
      });
        
      setArticleNameList([
        ...ArticleNameList,
        {
          ArticleName: ArticleName,
          ArticleSmDescr: ArticleSmDescr,
          ArticleMDescr: ArticleMDescr,
          ArticleImg: ArticleImg,
          ArticleType: ArticleType,
          ArticleCreatedAt: date,
          ArticleUpdatedAt: date
        }, //Valamiért mind a kettőt nagy A-vel kell írni, az első értékeket, azaz nem articleName: ArticleName
      ]);
    };

    return(
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>Article type:</label>
                    <select id="types" className="form-control" required {
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
                    <div className="invalid-feedback">You must select a article type.</div>
                </div>

                <div className="form-group">
                    <label>Article name:</label>
                    <input type="text" className="form-control" {
                        ...register("articleName", {
                            required: true,
                            minLength: 1,
                            maxLength: 20,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }onChange={(e) => {
                        setArticleName(e.target.value);
                    }}/>
                    
                    {errors?.articleName?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a name.</p></div>}
                    {errors?.articleName?.type === "minLength" && <div><h5>Your article's name is too short.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                    {errors?.articleName?.type === "maxLength" && <div><h5>Your article's name is too long.</h5><p>Your article's name length must be between 6 and 20 characters.</p></div>}
                    {errors?.articleName?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>
                
                <div className="form-group">
                    <label>Article small description:</label>
                    <input type="text" className="form-control" {
                        ...register("articleSmDescr", {
                            required: true,
                            minLength: 1,
                            maxLength: 100,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }onChange={(e) => {
                        setArticleSmDescr(e.target.value);
                    }}/>

                    {errors?.articleSmDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a small description of your article.</p></div>}
                    {errors?.articleSmDescr?.type === "minLength" && <div><h5>Your article's small description is too short.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                    {errors?.articleSmDescr?.type === "maxLength" && <div><h5>Your article's small description is too long.</h5><p>Your article's small description length must be between 8 and 100 characters.</p></div>}
                    {errors?.articleSmDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Article main description:</label>
                    <input type="text" className="form-control" {
                        ...register("articleMDescr", {
                            required: true,
                            minLength: 1,
                            maxLength: 500,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }onChange={(e) => {
                        setArticleMDescr(e.target.value);
                    }}/>

                    {errors?.articleMDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a main description of your article.</p></div>}
                    {errors?.articleMDescr?.type === "minLength" && <div><h5>Your article's main description is too short.</h5><p>Your article's main description length must be between 150 and 500 characters.</p></div>}
                    {errors?.articleMDescr?.type === "maxLength" && <div><h5>Your article's main description is too long.</h5><p>Your article's main description length must be between 150 and 500 characters.</p></div>}
                    {errors?.articleMDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Article image:</label>
                    <input type="url" className="form-control" {
                        ...register("articleImg", {
                            required: true, //kötelező legyen?
                            minLength: 1, //Mennyi legyen?
                            maxLength: 500, //Mennyi legyen?
                        })
                    }onChange={(e) => {
                        setArticleImg(e.target.value);
                    }}/>

                    {errors?.articleImg?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a picture</p></div>}
                    {errors?.articleImg?.type === "minLength" && <div><h5>Your article's picture URL is too short.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                    {errors?.articleImg?.type === "maxLength" && <div><h5>Your article's picture URL is too long.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                </div>

                <input type="submit" /> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
            </form>

            <h1>{LoginStatus}</h1>
        </div>
    );
}