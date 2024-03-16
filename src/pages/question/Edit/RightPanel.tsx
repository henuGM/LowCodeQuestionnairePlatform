import { Space, Tabs } from "antd";
import React, { FC, useEffect, useState } from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import PageSetting from "./PageSetting";

enum TAB_KEYS{
  PROP_KEY='prop',
  SETTING_KEY='setting'
}
const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <Space>
          <FileTextOutlined />
          属性
        </Space>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <Space>
          <SettingOutlined />
          页面设置
        </Space>
      ),
      children: <PageSetting/>,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems} />;
};

export default RightPanel;
