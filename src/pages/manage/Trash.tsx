import React, { FC, useEffect, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/WaterFallComponents/QuestionListView";
import { useRequest, useTitle } from "ahooks";
import {
  Empty,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Spin,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadingQuestionListData from "../../hooks/useLoadQuestionListService";
import ListPage from "../../components/ListPage";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../services/question";
const { Title } = Typography;
const { confirm } = Modal;

const tableColumns = [
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "是否发布",
    dataIndex: "isPublished",
    render: (isPublished: boolean) => {
      return isPublished ? (
        <Tag color="processing">已发布</Tag>
      ) : (
        <Tag>未发布</Tag>
      );
    },
  },
  {
    title: "答卷",
    dataIndex: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
  },
];

const Trash: FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    data = {},
    loading,
    refresh,
  } = useLoadingQuestionListData({ isDeleted: 1,pageSize:1000 });
  const { list = [] } = data;
  const filterList=list.filter((item: any) => item.isDeleted)
  const total=filterList.length;
  useTitle("问卷-----回收站");

  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: 0 });
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success("回收成功");
        refresh();
        setSelectedIds([]);
      },
      debounceWait: 500,
    }
  );

  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    }
  );

  const del = () => {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可找回",
      onOk: () => deleteQuestion(),
    });
  };
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={filterList}
        columns={tableColumns}
        pagination={false}
        rowKey={(p) => p.id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as number[]);
            console.log(selectedRowKeys);
          },
        }}
      />
    </>
  );
  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);
  return (
    <>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center", marginTop: "-22px" }}>
            <Spin />
          </div>
        )}
        {!loading && filterList.length === 0 && <Empty description="暂无数据" />}
        {filterList.length > 0 && TableElem}
      </div>
      {/* <div className={styles.footer}>
        <ListPage total={total} />
      </div> */}
    </>
  );
};
export default Trash;
