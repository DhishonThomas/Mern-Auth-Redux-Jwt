import useReducer from "./userSlice";
import adminReducer from "./adminSlice"
import { configureStore ,combineReducers} from "@reduxjs/toolkit";
import { loadState,saveState } from "./localStorage";
import dataReducer from "./dataSlice"

const rootReducer = combineReducers({
    user: useReducer,
    admin:adminReducer,
    dataUser:dataReducer
});

const preloadedState=loadState()

const appStore=configureStore(
    {
       reducer:rootReducer,
        preloadedState,
    }
)


appStore.subscribe(()=>{
    saveState({
        user:appStore.getState().user,
        admin:appStore.getState().admin,
        dataUser:appStore.getState().dataUser
    })
})
export type RootState = ReturnType<typeof appStore.getState>;


export default appStore