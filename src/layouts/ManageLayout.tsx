import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Space, Divider, message, Spin, FloatButton } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./ManageLayout.module.scss";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import ListSearch from "../components/ListSearch";
const ManageLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  // useNavPage(waitingUserData);

  // const [loading,setLoading]=useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();

  // async function handleCreateClick(){
  //   setLoading(true);
  //   const data=await createQuestionService();
  //   const {id}=data||{};
  //   if(id){
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false);
  // }
  const { loading, run: handleCreateClick } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess(result) {
        nav(`/question/edit/${result}`);
        message.success("创建成功");
      },
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="horizontal">
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            // icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
          >
            普通问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            // icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            // icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
          <div style={{ marginLeft: "640px" }}>
            <ListSearch />
          </div>
        </Space>
      </div>
      <Divider/>
      <div className={styles.right}>
        {waitingUserData ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
export default ManageLayout;
