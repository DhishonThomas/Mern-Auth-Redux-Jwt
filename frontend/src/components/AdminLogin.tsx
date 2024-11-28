import { useState,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { ADMIN_API_URL, LOGIN_URL, } from '../utils/constans';
import { checkvalidateData } from '../utils/validate';
import { addAdmin } from '../utils/adminSlice';


const AdminLogin:React.FC = () => {

    const [errorMessage, setErrMessage] = useState<string | null>("");
  
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
  
    const dispatch=useDispatch()
    const navigate=useNavigate()



const handleButtonClick=async()=>{

    const email=emailRef.current?.value||''
    const password=passwordRef.current?.value||''
const userName=null
    const errMesage=checkvalidateData(email,password,userName)
    setErrMessage(errMesage)
    


    if(errMesage)return
    

    const login=await axios.post(ADMIN_API_URL+LOGIN_URL,{email,password})
    console.log(login.data.message);
    
    if(login.data.error)return setErrMessage(login.data.message) 
    
      console.log("loginvfsdsd",login)
    
    if(login.data.token){
      const token=login.data.token
    
      localStorage.setItem('token',token)
      
      const tokenResponse=await axios.get(ADMIN_API_URL+"/me",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        console.log("tokenResponse",tokenResponse)
      
        dispatch(addAdmin(tokenResponse.data))
      
        navigate("/adminHome")
    }
    
    
    }





  return (<>
 <div className="max-h-screen flex flex-col items-center justify-center pt-16">
      <div className="bg-slate-200 shadow-lg overflow-hidden w-full max-w-xl mx-4">
        <div className="px-6 py-8">
          <h1 className='font-bold text-2xl mb-6 text-gray-800"'>
           Admin Sign In
          </h1>

          <form 
          onSubmit={(e)=>{e.preventDefault()}}
          >
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
            Sign In
            </button>

            <p className="text-red-500 pt-6">{errorMessage}</p>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminLogin