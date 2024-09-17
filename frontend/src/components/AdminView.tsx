import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ADMIN_API_URL,ADMIN_VIEW } from '../utils/constans'
import axios from 'axios'
const AdminView = (userdata:any) => {

  const {userId}=useParams()
console.log("userId",userId)

const [userData,setUserData]=useState<any>([])

const fetchData=async()=>{
  const data=await axios.get(ADMIN_API_URL+ADMIN_VIEW+`/${userId}`)

  setUserData(data.data)
  console.log(data.data);
  

}
useEffect(()=>{

  fetchData()
},[])

console.log(userData);


if(userData.length==0)return

console.log("iahduihduihduiashduiashuhascj",userData.email);

const {_id,email,imageUrl,username}=userData

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
              {(imageUrl) && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-fit rounded-full"
                />
              )}
              {!imageUrl && <h1>No Image</h1>}
            </div>
          </div>
         

          <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 mb-2">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={username}
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
              type="email"
              id="email"
              name="email"
              value={email}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

    
        </form>
  </div>  )
}

export default AdminView