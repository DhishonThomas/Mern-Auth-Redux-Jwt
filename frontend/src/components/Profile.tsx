import React, { useRef, useState ,useEffect} from "react";
import { useSelector } from "react-redux";

import { RootState } from "../utils/appStore";
import axios from "axios";
import {
  API_URL,
  PROFILE_URL,
  COLUDINARY_URL,
  UPLOAD_PRESIST,
} from "../utils/constans";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const user: any = useSelector((state: RootState) => state.user);

  const { username, email, imageUrl } = user.user;

  const [imagePreview, setImagePreview] = useState(imageUrl);

  const [errMessage, setErrMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [usernameChange, setUsername] = useState(username);

  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);


  
  const handleSubmit = async () => {
    setUploading(true);
    const emailUpdate = emailRef.current?.value || "";
    const userNameUpdate = userNameRef.current?.value || "";
    const imageFile: any = imageRef.current?.files
      ? imageRef.current?.files[0]
      : null;



    const nameValidate = /^[a-zA-Z' -]{2,30}$/.test(userNameUpdate);
    if (!nameValidate) return setErrMessage("Name is not valid");

    console.log("before image update", imagePreview);
    console.log("imageFiless", imageFile);


    let imageUpdate=imagePreview
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", UPLOAD_PRESIST);

        const response = await fetch(COLUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        imageUpdate = data.secure_url;

        console.log("urlImage",imageUpdate)

        setImagePreview(imageUpdate);

        console.log("Image preview ", imagePreview);

        console.log("Image URL new :", data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    } else {
      console.log("No image selected");
    }
    console.log("after image update", imagePreview);

          const profileResponse = await axios.post(API_URL + PROFILE_URL, {
          email: emailUpdate,
          username: userNameUpdate,
          imageUrl: imageUpdate,
        });
        dispatch(addUser(profileResponse.data.user));
        console.log("profileResponse", profileResponse);
        setUploading(false);
        setImagePreview(imagePreview)
  };

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="secondDiv mt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          id="add-product-form"
          className="max-w-lg mx-auto bg-slate-300 p-8 shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-6">Profile</h2>

          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-slate-500 w-48 h-48 flex items-center justify-center">
              {(user.user.imageUrl || imagePreview) && (
                <img
                  src={imagePreview ? imagePreview : user.user.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-fit rounded-full"
                />
              )}
              {!imagePreview && !user.user.imageUrl ? <h1>Add Image</h1> : ""}
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <input
              ref={imageRef}
              onChange={handleImage}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="mb-4"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 mb-2">
              User Name
            </label>
            <input
              ref={userNameRef}
              type="text"
              id="userName"
              name="userName"
              value={usernameChange}
              onChange={handleUsername}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              disabled
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              value={email}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full mt-8 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            {uploading ? "Updating...." : "Update"}
          </button>

          <p className="text-red-600 font-bold pt-5">{errMessage}</p>
        </form>
      </div>
    </>
  );
};

export default Profile;