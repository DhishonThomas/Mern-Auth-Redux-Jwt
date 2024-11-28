import React from 'react'
import { useDispatch } from 'react-redux';
import { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkvalidateData } from '../utils/validate';
import axios from 'axios';
import { API_URL,REGISTER_URL } from '../utils/constans';
import Swal from 'sweetalert2';
const AdminAdd = () => {


    const [errorMessage, setErrMessage] = useState<string | null>("");

     const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
  
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleButtonClick =async () => {
  
  const email=emailRef.current?.value||''
  const password=passwordRef.current?.value||''
  const userName=userNameRef.current?.value||null
  
  const errMesage=checkvalidateData(email,password,userName)
  setErrMessage(errMesage)
  
  if(errMesage)return

  
  const register=await axios.post(API_URL+REGISTER_URL,{username:userName,email,password})
    console.log("register,",register.data.message)
    //handele the errp-r
  if(register.data.existingUser){
    return setErrMessage(register.data.message)
  }
  Swal.fire({
    title: "User Created Successfully",
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
  }).then(()=>{
  })
  
  
  
    }
  
  

  return (
    <div className="max-h-screen flex flex-col items-center justify-center pt-16">
    <div className="bg-slate-200 shadow-lg overflow-hidden w-full max-w-xl mx-4">
      <div className="px-6 py-8">
        <h1 className='font-bold text-2xl mb-6 text-gray-800"'>
ADD USER        </h1>

        <form 
        onSubmit={(e)=>{e.preventDefault()}}
        >
          
            <div className="mb-6">
              <label
                htmlFor="full name"
                className="text-pretty text-xl text-gray-700 font-bold mb-2"
              >
                Full Name
              </label>

              <input
                ref={userNameRef}
                type="text"
                className="w-full rounded-lg hover:focus:outline-none  focus:ring-2 focus:ring-blue-400"
              />
            </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-pretty text-xl text-gray-700 font-bold mb-2"
            >
              Email
            </label>

            <input
            ref={emailRef}
              type="text"
              className="w-full rounded-lg hover:focus:outline-none  focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-pretty text-xl text-gray-700 font-bold mb-2"
            >
              Password
            </label>

            <input
            ref={passwordRef}
              type="password"
              className="w-full rounded-lg hover:focus:outline-none  focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={handleButtonClick}
            className="bg-green-400 p-2 rounded-lg"
          >
            Create User
          </button>

          <p className="text-red-500 pt-6">{errorMessage}</p>
        </form>
      </div>
    </div>
  </div>  )
}

export default AdminAdd