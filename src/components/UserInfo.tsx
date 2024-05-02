import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { removeToken } from "../utils/user-token";
import { Button, Dropdown, MenuProps, Space, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { username, nickname } = useGetUserInfo();
  function logout() {
    dispatch(logoutReducer());
    removeToken();
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/userInfo"}>用户信息</Link>,
    },
    {
      key: "2",
      label: (
        <Button type="link" onClick={logout}>
          退出
        </Button>
      ),
      // icon: <SmileOutlined />,
      disabled: true,
    },
  ];

  const UserInfo = (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <text style={{ color: "white" }}>{username}</text>
            <DownOutlined style={{ color: "white" }} />
          </Space>
        </a>
      </Dropdown>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <>{username ? UserInfo : Login}</>;
};
export default UserInfo;
