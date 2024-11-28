import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState }from "../utils/appStore";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
const navigate=useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("token");

    console.log("user remover")

    dispatch(removeUser());
    localStorage.removeItem("state");

    navigate("/")
};


  const user:any= useSelector((state: RootState) => state.user);
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  return (
    <div className="p-6 bg-slate-400 flex items-center">
      <div className="font-extrabold text-4xl">MernAuth</div>
      <div className="flex-grow"></div>
      <div className="mr-10">
        {user.user!==null? (
          <button
            className="text-xl font-bold bg-slate-300 p-2 rounded-lg hover:pointer-events-auto"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to={"/"}> <button className="text-xl font-bold bg-slate-300 p-2 rounded-lg hover:pointer-events-auto"
          
          >
           Login
            
          </button>
          </Link>
        )}
      </div>
     { user.user&&<div className="mr-10">
        <Link to={"/profile"}><h2>Profile</h2>
</Link>
      </div>}
    </div>
  );
};

export default Header;
