import React, { FC, useEffect } from "react";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title level={2}>问卷调查 </Title>
        <div className={styles.button}>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
        </div>
      </div>
    </div>
  );
};
export default Home;