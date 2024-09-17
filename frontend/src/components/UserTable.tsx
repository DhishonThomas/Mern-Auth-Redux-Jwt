import axios from "axios";
import React,{useState} from "react";
import { ADMIN_API_URL,ADMIN_EDIT,ADMIN_VIEW ,ADMIN_DELETE,} from "../utils/constans";
import AdminView from "./AdminView";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteUser } from "../utils/dataSlice";

interface UserTableProps {
  user: any;
  index: number;
}

const UserTable:React.FC<UserTableProps> = ({user,index}) => {


console.log("index",index);


const dispatch=useDispatch()


const handleEdit=()=>{

}

// const handleView=async(userId:string)=>{

// const data=await axios.get(ADMIN_API_URL+ADMIN_VIEW+`/${userId}`)


// console.log("hfhfhhfhhfhf",data)
// }


const handleDelete = async (userId:string) => {
  console.log(ADMIN_API_URL + ADMIN_DELETE + `/${userId}`)

  dispatch(deleteUser(userId))
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result:any) => {
    if (result.isConfirmed) {
      axios.delete(ADMIN_API_URL + ADMIN_DELETE + `/${userId}`)
        .then((response) => {
          Swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
          );

        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the user.',
            'error'
          );
        });
    }
  });
};

  return (
    <tbody>
    <tr>
      <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
      <td className="border border-gray-300 px-4 py-2">{user.username}</td>
      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <Link to={ADMIN_EDIT+"/"+user._id}> <button
        onClick={handleEdit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Edit
        </button></Link>
       
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">

        <Link to={ADMIN_VIEW+"/"+user._id}>
        <button 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          View
        </button>
        </Link>
      </td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button 
        onClick={()=>{handleDelete(user._id)}}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
       
      </td>
    </tr>

  </tbody>
  
  );
};

export default UserTable;
