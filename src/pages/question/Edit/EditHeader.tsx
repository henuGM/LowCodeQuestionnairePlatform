import React, { ChangeEvent, FC, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditHeader.module.scss";
import { Button, Input, InputRef, Space, Typography, message } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { updateQuestionService } from "../../../services/question";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";

const { Title } = Typography;

const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const inputRef = useRef<InputRef>(null);
  const dispatch = useDispatch();

  const [editState, SetEditState] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }

  if (editState) {
    return (
      <Input
        ref={inputRef}
        value={title}
        onChange={handleChange}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
      />
    );
  }

  return (
    <Space style={{ margin: "-10px 0" }}>
      <Title className={styles.h1}>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          SetEditState(true);
          setTimeout(() => {
            inputRef.current!.focus({
              cursor: "end",
            });
          }, 300);
        }}
      />
    </Space>
  );
};

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(parseInt(id), { ...pageInfo, componentList })
    },
    { manual: true }
  )

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(parseInt(id), {
        ...pageInfo,
        componentList,
        isPublished: 1, // 标志着问卷已经被发布
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id) // 发布成功，跳转到统计页面
      },
    }
  )

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}


const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
