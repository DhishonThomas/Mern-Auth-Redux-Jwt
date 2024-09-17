import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ADMIN_API_URL, ADMIN_HOME_URL } from '../utils/constans'
import UserTable from './UserTable'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../utils/adminSlice'
import { addData } from '../utils/dataSlice'
import { Link } from 'react-router-dom'

const AdminHome = () => {
const dispatch=useDispatch()
const dataUser:any=useSelector((store:RootState)=>store.dataUser)


  const [userData,setUserData]=useState([])

const fetchData=async()=>{

const data:any=await axios.get(ADMIN_API_URL+ADMIN_HOME_URL)

console.log("data.data.user",data.data.user)

setUserData(data.data.user)
dispatch(addData(data.data.user))
}

useEffect(()=>{

fetchData()

},[])

console.log(userData)
console.log("dataUsre",dataUser);


if(dataUser.dataUser===null)return 

console.log("dataUsre",dataUser);

  return (
    <div className="container mx-auto">
    <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 1.414l5 5a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
<Link to={"/adduser"}>    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Add User
      </button></Link>
  
    </div>
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">#</th>
          <th className="border border-gray-300 px-4 py-2">Username</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Edit</th>
          <th className="border border-gray-300 px-4 py-2">View</th>
          <th className="border border-gray-300 px-4 py-2">Delete</th>
        </tr>
      </thead>
{dataUser&&dataUser.dataUser.map((user:any,index:number)=>(

<UserTable key={user._id} user={user} index={index}/>

))

}

    </table>
  </div>  )
}

export default AdminHome