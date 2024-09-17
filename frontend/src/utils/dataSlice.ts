import { createSlice } from "@reduxjs/toolkit";
import appStore  from "./appStore";
import { PayloadAction } from "@reduxjs/toolkit";
interface User {
  _id: string;
  username: string;
  email: string;
  imageUrl?: string;
}
interface DataState{
    dataUser: User[] | null;
}

const initialState:DataState={
    dataUser:null
}


const dataSlice=createSlice({
    name:"dataUser",
    initialState,
    reducers:{
        addData: (state, action: PayloadAction<User[]>) => {
            state.dataUser = action.payload;
          },
          deleteUser: (state, action: PayloadAction<string>) => {
            if (state.dataUser) {
              state.dataUser = state.dataUser.filter(user => user._id !== action.payload);
            }
          },
          updateUser: (state, action: PayloadAction<User>) => {
            if (state.dataUser) {
              state.dataUser = state.dataUser.map(user => 
                user._id === action.payload._id ? action.payload : user
              );
            }
          },

        
    }
})

export type RootState = ReturnType<typeof appStore.getState>;

export const {addData,deleteUser,updateUser}=dataSlice.actions


export default dataSlice.reducer