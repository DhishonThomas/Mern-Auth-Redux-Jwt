import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_API_URL, ADMIN_VIEW, UPLOAD_PRESIST, COLUDINARY_URL, API_URL, PROFILE_URL } from '../utils/constans';
import { useDispatch } from 'react-redux';
import { updateUser } from '../utils/dataSlice';

const AdminEdit = () => {

  const dispatch=useDispatch()
  const { userId } = useParams();
  const [userData, setUserData] = useState<any>(null);  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errMessage, setErrMessage] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [usernameChange, setUsername] = useState<string>('');

  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(ADMIN_API_URL + ADMIN_VIEW + `/${userId}`);
      setUserData(data);
      setImagePreview(data.imageUrl);  
      setUsername(data.username);      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (!userData) return null;

  const handleSubmit = async () => {
    setUploading(true);
    const emailUpdate = emailRef.current?.value || '';
    const userNameUpdate = userNameRef.current?.value || '';
    const imageFile = imageRef.current?.files ? imageRef.current.files[0] : null;

    const nameValidate = /^[a-zA-Z' -]{2,30}$/.test(userNameUpdate);
    if (!nameValidate) {
      setUploading(false);
      return setErrMessage('Name is not valid');
    }

    let imageUpdate = imagePreview;
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', UPLOAD_PRESIST);

        const response = await fetch(COLUDINARY_URL, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        imageUpdate = data.secure_url;
        setImagePreview(imageUpdate);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    }

    try {

console.log(API_URL + PROFILE_URL);


     const {data}= await axios.post(API_URL + PROFILE_URL, {
        email: emailUpdate,
        username: userNameUpdate,
        imageUrl: imageUpdate,
      });

      console.log("response data",data);
      dispatch(updateUser(data))

      setUploading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setUploading(false);
    }
  };

  const handleUsername = (e:any) => {
    setUsername(e.target.value);
  };

  const handleImage = (e:any) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  return (
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
            {(userData.imageUrl || imagePreview) && (
              <img
                src={imagePreview || userData.imageUrl}
                alt="Preview"
                className="w-full h-full object-fit rounded-full"
              />
            )}
            {!imagePreview && !userData.imageUrl && <h1>Add Image</h1>}
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
            value={userData.email}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full mt-8 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          {uploading ? 'Updating....' : 'Update'}
        </button>

        <p className="text-red-600 font-bold pt-5">{errMessage}</p>
      </form>
    </div>
  );
};

export default AdminEdit;
