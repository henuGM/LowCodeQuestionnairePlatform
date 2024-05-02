import React, { FC } from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Space, Tabs } from "antd";
import Lib from "./ComponentLib";
import Layers from "./Layers";
const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: "componentLib",
      label: (
        <Space>
          {/* <AppstoreOutlined /> */}
          组件列表
        </Space>
      ),
      children: <Lib/>,
    },
    {
      key: "layers",
      label: (
        <Space>
          {/* <BarsOutlined /> */}
          图层列表
        </Space>
      ),
      children: <Layers/>,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
