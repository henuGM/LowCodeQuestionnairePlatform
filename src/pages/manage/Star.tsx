import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadingQuestionListData from "../../hooks/useLoadQuestionListService";
import ListPage from "../../components/ListPage";
const { Title } = Typography;

const Star: FC = () => {
  useTitle("问卷-----星标");
  const { data = {}, loading } = useLoadingQuestionListData({ isStar: 1 });
  const { list = [], total = 0 } = data||{};

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center", marginTop: "-22px" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};
export default Star;
