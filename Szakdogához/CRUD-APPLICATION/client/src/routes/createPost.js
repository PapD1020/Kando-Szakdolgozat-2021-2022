import React from "react";
import { useForm } from "react-hook-form";

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
                <label>Post name:</label>
                <input type="text" {
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
                
                <label>Post small description:</label>
                <input type="text" {
                    ...register("postSmDescr", {
                        required: true,
                        minLength: 8,
                        maxLength: 100,
                        pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                    })
                }/>

                <label>Post main description:</label>
                <input type="text" {
                    ...register("postMDescr", {
                        required: true,
                        minLength: 150,
                        maxLength: 500,
                        pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                    })
                }/>

                <label>Post image:</label>
                <input type="url" {
                    ...register("postImg", {
                        required: true,
                        minLength: 150,
                        maxLength: 500,
                        pattern: /^[A-Za-z]+$/i //valószínűleg nincsenek benne ékezetes betűk, javítani kell
                    })
                }/>

                <label>Post type:</label>
                <select id="types" name="types" {
                    ...register("postType", {
                        required: true,
                    })
                }>
                    <option value="" selected>Select the post type</option>
                    <option value="Programming">Programming</option>
                    <option value="Programming">Other</option>
                </select>
            </form>

        </div>
    );
}