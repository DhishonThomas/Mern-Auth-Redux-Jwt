import React from 'react'
import { useDispatch } from 'react-redux';
import { RootState, removeAdmin } from '../utils/adminSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminHeader = () => {

    const dispatch=useDispatch()
const navigate=useNavigate()
const user=useSelector((store:RootState)=>store.admin)

    const handleLogout = () => {
        localStorage.removeItem("token");
    
        console.log("user remover")
    
        dispatch(removeAdmin());
        localStorage.removeItem("state");
    
        navigate("/admin")
    };
    

  return (
    <div className="p-6 bg-slate-400 flex items-center">
    <div className="font-extrabold text-4xl">MernAuth Admin  Pannel</div>
    <div className="flex-grow"></div>
    <div className="mr-10">
      {user.admin!==null? (
        <button
          className="text-xl font-bold bg-slate-300 p-2 rounded-lg hover:pointer-events-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link to={"/admin"}> <button className="text-xl font-bold bg-slate-300 p-2 rounded-lg hover:pointer-events-auto"
        
        >
         Login
          
        </button>
        </Link>
      )}
    </div>

  </div>  )
}

export default AdminHeader