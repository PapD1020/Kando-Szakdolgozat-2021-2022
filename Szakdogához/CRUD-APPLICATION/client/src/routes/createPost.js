import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button"

export default function CreatePost(){

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
                    <label>Post name:</label>
                    <input type="text" className="form-control" {
                        ...register("postName", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>
                    
                    {errors?.postName?.type === "required" && <div><h5>This field is required!</h5><p>Your post must have a name.</p></div>}
                    {errors?.postName?.type === "minLength" && <div><h5>Your post's name is too short.</h5><p>Your post's name length must be between 6 and 20 characters.</p></div>}
                    {errors?.postName?.type === "maxLength" && <div><h5>Your post's name is too long.</h5><p>Your post's name length must be between 6 and 20 characters.</p></div>}
                    {errors?.postName?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>
                
                <div className="form-group">
                    <label>Post small description:</label>
                    <input type="text" className="form-control" {
                        ...register("postSmDescr", {
                            required: true,
                            minLength: 8,
                            maxLength: 100,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>

                    {errors?.postSmDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your post must have a small description of your post.</p></div>}
                    {errors?.postSmDescr?.type === "minLength" && <div><h5>Your post's small description is too short.</h5><p>Your post's small description length must be between 8 and 100 characters.</p></div>}
                    {errors?.postSmDescr?.type === "maxLength" && <div><h5>Your post's small description is too long.</h5><p>Your post's small description length must be between 8 and 100 characters.</p></div>}
                    {errors?.postSmDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Post main description:</label>
                    <input type="text" className="form-control" {
                        ...register("postMDescr", {
                            required: true,
                            minLength: 150,
                            maxLength: 500,
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>

                    {errors?.postMDescr?.type === "required" && <div><h5>This field is required!</h5><p>Your post must have a main description of your post.</p></div>}
                    {errors?.postMDescr?.type === "minLength" && <div><h5>Your post's main description is too short.</h5><p>Your post's main description length must be between 150 and 500 characters.</p></div>}
                    {errors?.postMDescr?.type === "maxLength" && <div><h5>Your post's main description is too long.</h5><p>Your post's main description length must be between 150 and 500 characters.</p></div>}
                    {errors?.postMDescr?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Post image:</label>
                    <input type="url" className="form-control" {
                        ...register("postImg", {
                            required: true, //kötelező legyen?
                            minLength: 150, //Mennyi legyen?
                            maxLength: 500, //Mennyi legyen?
                            pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                        })
                    }/>

                    {errors?.postImg?.type === "required" && <div><h5>This field is required!</h5><p>Your post must have a picture</p></div>}
                    {errors?.postImg?.type === "minLength" && <div><h5>Your post's picture URL is too short.</h5><p>Your post's picture URL length must be between 150 and 500 characters.</p></div>}
                    {errors?.postImg?.type === "maxLength" && <div><h5>Your post's picture URL is too long.</h5><p>Your post's picture URL length must be between 150 and 500 characters.</p></div>}
                    {errors?.postImg?.type === "pattern" && <div><h5>Forbidden character usage.</h5><p>You must use alphabetical characters only.</p></div>}
                </div>

                <div className="form-group">
                    <label>Post type:</label>
                    <select id="types" className="form-control" required {
                        ...register("postType", {
                            required: true,
                        })
                    }>
                        <option value="" selected>Select the post type</option>
                        <option value="Programming">Programming</option>
                        <option value="Programming">Other</option>
                    </select>
                    <div className="invalid-feedback">You must select a post type.</div>
                </div>

                <input type="submit" /> {/*Kell egybe ellenörző, küldő gomb vagy külön-külön ha nem megy egybe */}
            </form>
        </div>
    );
}