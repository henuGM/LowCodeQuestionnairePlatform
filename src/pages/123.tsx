import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Avatar, Typography, Spin, Row, Col, Divider, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useGetUserInfo from "../hooks/useGetUserInfo";

const { Title, Text } = Typography;

const UserInfoPage: React.FC = () => {
    const { id, username, nickname, create_time, update_time } = useGetUserInfo();

  if (!username) return <Spin />; // 使用Spin组件显示加载状态，需提前导入


  const [editableUsername, setEditableUsername] = useState<string>(username);
  const [editableNickname, setEditableNickname] = useState<string>(nickname);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableUsername(event.target.value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableNickname(event.target.value);
  };

  const saveChanges = () => {
    // 这里应调用更新用户信息的API，如updateUserInfo(editableUsername, editableNickname)
    // 然后重新获取用户信息以更新状态
  };

  return (
    <Row
      gutter={24}
      style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
    >
      <Col span={24}>
        <Card bordered={false}>
          <Card.Meta
            avatar={
              <Avatar
                size="large"
                style={{ backgroundColor: "#87d068", width: 50, height: 50 }}
                icon={<UserOutlined />}
              />
            }
            title={
              <Input
                value={editableUsername}
                onChange={handleUsernameChange}
                onBlur={saveChanges}
              />
            }
            description={
              <Input
                value={editableNickname}
                onChange={handleNicknameChange}
                onBlur={saveChanges}
              />
            }
            style={{ marginLeft: "10%" }}
          />
          <Divider />
          <Row>
            <Col span={8}>
              <Text strong>Id:</Text>
              <Text>{id}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Create Time:</Text>
              <Text>{create_time}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Update Time:</Text>
              <Text>{update_time}</Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserInfoPage;