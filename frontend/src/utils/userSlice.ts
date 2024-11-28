import { createSlice } from "@reduxjs/toolkit";
import appStore from "./appStore";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    user:any
}

const initialState:UserState={
    user:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload
        },
        removeUser:(state,action:PayloadAction)=>{
            state.user=null
        }
    }
})

export const {addUser,removeUser}=userSlice.actions
export type RootState = ReturnType<typeof appStore.getState>;

export default userSlice.reducer;