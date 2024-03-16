import { useGetState, useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { getUserInfoService } from "../services/user";
import useGetUserInfo from "./useGetUserInfo";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";

function useLoadUserData(){
    const [waitingUserData,setWaitingUserData]=useState(true);
    const dispath=useDispatch();

    const {run}=useRequest(getUserInfoService,
        {
            manual:true,
            onSuccess(result){
                const {username,nickname}=result;
                dispath(loginReducer({username,nickname}))
            },
            onFinally(){
                setWaitingUserData(false)
            }
        })
    
    const {username}=useGetUserInfo();
    useEffect(()=>{
        if(username){
            setWaitingUserData(false);
            return;
        }
        run()
    },[username])

    return {waitingUserData}
}
export default useLoadUserData;