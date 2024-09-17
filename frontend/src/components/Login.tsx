import React, { useRef, useState } from "react";
import { checkvalidateData } from "../utils/validate";
import axios from "axios";
import { API_URL,LOGIN_URL,REGISTER_URL } from "../utils/constans";
import { UseDispatch, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
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
console.log(errMesage);

setErrMessage(errMesage)

if(errMesage)return

if(!isSignInForm){


const register=await axios.post(API_URL+REGISTER_URL,{username:userName,email,password})
  console.log("register,",register.data.message)
  //handele the errp-r
if(register.data.existingUser){
  return setErrMessage(register.data.message)
}
Swal.fire({
  title: "Registered Successfully",
  icon: "success",
  timer: 3000,
  showConfirmButton: false,
}).then(()=>{
  setIsSignInForm(true)
})

}else{ 
  
  const login=await axios.post(API_URL+LOGIN_URL,{email,password})
console.log(login.data.message);

if(login.data.error)return setErrMessage(login.data.message) 

  console.log("loginvfsdsd",login)

if(login.data.token){
  const token=login.data.token

  localStorage.setItem('token',token)
  
  const tokenResponse=await axios.get(API_URL+"/me",{
    headers: {
      'Authorization': `Bearer ${token}`  
    }
  })
    console.log("tokenResponse",  )
  
    dispatch(addUser(tokenResponse.data))
  
    navigate("/home")
}


}

  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="max-h-screen flex flex-col items-center justify-center pt-16">
      <div className="bg-slate-200 shadow-lg overflow-hidden w-full max-w-xl mx-4">
        <div className="px-6 py-8">
          <h1 className='font-bold text-2xl mb-6 text-gray-800"'>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <form 
          onSubmit={(e)=>{e.preventDefault()}}
          >
            {!isSignInForm && (
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
            )}
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
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <p className="text-red-500 pt-6">{errorMessage}</p>
          </form>

          <p className="mt-6 text-center text-gray-700">
            {isSignInForm ? "New to App?" : "Already have an account?"}
            <span
              className="text-blue-500 cursor-pointer ml-2"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign Up Now" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
