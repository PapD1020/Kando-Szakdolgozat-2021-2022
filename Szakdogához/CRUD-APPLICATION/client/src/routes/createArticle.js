import React from "react";
import { useForm } from "react-hook-form";

export default function CreateArticle(){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Article name:</label>
                    <input type="text" className="form-control" {
                        ...register("articleName", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>
                    
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
                            minLength: 8,
                            maxLength: 100,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>

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
                            minLength: 150,
                            maxLength: 500,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>

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
                            minLength: 150, //Mennyi legyen?
                            maxLength: 500, //Mennyi legyen?
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>

                    {errors?.articleImg?.type === "required" && <div><h5>This field is required!</h5><p>Your article must have a picture</p></div>}
                    {errors?.articleImg?.type === "minLength" && <div><h5>Your article's picture URL is too short.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                    {errors?.articleImg?.type === "maxLength" && <div><h5>Your article's picture URL is too long.</h5><p>Your article's picture URL length must be between 150 and 500 characters.</p></div>}
                    {errors?.articleImg?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Article type:</label>
                    <select id="types" className="form-control" required {
                        ...register("articleType", {
                            required: true,
                        })
                    }>
                        <option value="" defaultValue={"Select the article type"}>Select the article type</option>
                        <option value="Programming">Programming</option>
                        <option value="Programming">Other</option>
                    </select>
                    <div className="invalid-feedback">You must select a article type.</div>
                </div>

                <input type="submit" /> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
            </form>
        </div>
    );
}