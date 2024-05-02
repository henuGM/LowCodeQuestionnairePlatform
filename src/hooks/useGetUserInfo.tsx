import { UseSelector, useSelector } from "react-redux";
import { StateType } from "../store";
import { UserStateType } from "../store/userReducer";

function useGetUserInfo() {
  const { id, username, nickname, create_time, update_time } =
    useSelector<StateType>((state) => state.user) as UserStateType;
  return { id, username, nickname, create_time, update_time };
}
export default useGetUserInfo;
