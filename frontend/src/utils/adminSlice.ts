import { createSlice } from "@reduxjs/toolkit";
import appStore from "./appStore";
import { PayloadAction } from "@reduxjs/toolkit";

interface AdminState{
    admin:any
}

const initialState:AdminState={
    admin:null
}

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        addAdmin:(state,action)=>{
            state.admin=action.payload
        },
        removeAdmin:(state,action:PayloadAction)=>{
            state.admin=null
        }
    }
})

export const {addAdmin,removeAdmin}=adminSlice.actions
export type RootState = ReturnType<typeof appStore.getState>;

export default adminSlice.reducer;