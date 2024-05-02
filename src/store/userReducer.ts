import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType={
    id:number,
    username:string,
    nickname:string,
    create_time:string,
    update_time:string
}

const INIT_STATE:UserStateType={id:-1,username:'',nickname:'',create_time:'',update_time:''};

export const userSlice=createSlice({
    name:'user',
    initialState:INIT_STATE,
    reducers:{
        loginReducer:(state:UserStateType,action:PayloadAction<UserStateType>)=>{
            return action.payload
        },
        logoutReducer:()=>INIT_STATE
    }
})

export const {loginReducer,logoutReducer}=userSlice.actions;

export default userSlice.reducer;