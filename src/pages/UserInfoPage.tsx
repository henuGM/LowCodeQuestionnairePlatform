import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Spin,
  Row,
  Col,
  Divider,
  Input,
  Button,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useRequest } from "ahooks";
import { updateUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";

const { Title, Text } = Typography;

const UserInfoPage: React.FC = () => {
  const {
    id,
    username: fetchedUsername,
    nickname,
    create_time,
    update_time,
  } = useGetUserInfo();
  const dispath = useDispatch();
  const { run: editUserInfo } = useRequest(
    async (values) => {
      const { username, nickname } = values;
      await updateUserInfoService(username, nickname);
    },
    {
      manual: true,
      onSuccess() {
        const { username, nickname } = editableUserInfo;
        dispath(
          loginReducer({ id, username, nickname, create_time, update_time })
        );
        message.success("更新用户信息成功");
      },
    }
  );

  // Initialize state based on fetched data or default values
  const [editableUserInfo, setEditableUserInfo] = useState({
    username: fetchedUsername || "",
    nickname: nickname || "",
  });

  if (!fetchedUsername) return <Spin />;

  const handleInputChange =
    (field: "username" | "nickname") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditableUserInfo((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    };

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          bordered={false}
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: 8,
          }}
        >
          <Card.Meta
            avatar={
              <Avatar
                size="large"
                style={{ backgroundColor: "#87d068", width: 50, height: 50 }}
                icon={<UserOutlined />}
              />
            }
            title={<Text>{fetchedUsername}</Text>}
            description={<Text>{nickname}</Text>}
          />
          <Divider />
          <Row gutter={24} align={"middle"}>
            <Col span={24}>
              <Input
                addonBefore="Username"
                value={editableUserInfo.username}
                onChange={handleInputChange("username")}
                disabled={!editableUserInfo.username} // Assuming you want to disable editing if username is empty
              />
            </Col>
          </Row>
          <div style={{ marginBottom: 16 }}></div>
          <Row gutter={24} align={"middle"}>
            <Col span={24}>
              <Input
                addonBefore="Nickname"
                value={editableUserInfo.nickname}
                onChange={handleInputChange("nickname")}
              />
            </Col>
          </Row>
          <div style={{ marginBottom: 16 }}></div>
          <Row gutter={24} align={"middle"}>
            <Col span={24}>
              <Input addonBefore="ID" value={id} disabled={true} />
            </Col>
          </Row>
          <div style={{ marginBottom: 16 }}></div>
          <Row gutter={24} align={"middle"}>
            <Col span={24}>
              <Input
                addonBefore="create_time"
                value={create_time}
                disabled={true}
              />
            </Col>
          </Row>
          <div style={{ marginBottom: 16 }}></div>
          <Row gutter={24} align={"middle"}>
            <Col span={24}>
              <Input
                addonBefore="update_time"
                value={update_time}
                disabled={true}
              />
            </Col>
          </Row>
          <Divider />
          <Row justify="end">
            <Button
              type="primary"
              onClick={() => editUserInfo(editableUserInfo)}
              style={{ width: "15%" }}
            >
              保存
            </Button>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfoPage;
