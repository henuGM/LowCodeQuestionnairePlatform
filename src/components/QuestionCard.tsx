import React, { FC, useState } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useRequest } from "ahooks";
import { duplicateQuestionService, updateQuestionService } from "../services/question";
type PropsType = {
  id: number;
  title: string;
  isStar: number;
  isPublished: number;
  answerCount: number;
  createdAt: string;
};
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { confirm } = Modal;
  const { id, title, isPublished, answerCount, createdAt, isStar } = props;

  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(id, { isStar: !isStarState?1:0 });
    },
    {
      manual: true,
      onSuccess(){
        setIsStarState(!isStarState?1:0);
        message.success('已更新')
      }
    }
  );

  const {loading:duplicateLoading,run:duplicate}=useRequest(
    async ()=>{
      const data=await duplicateQuestionService(id)
      return data;
    },
    {
      manual:true,
      onSuccess(result){
        message.success("复制成功");
        nav(`/question/edit/${result.id}`)
      }
    }
  )

  const [isDeletedState,setIsDeletedState]=useState(false);
  const {loading:deleteLoading,run:deleteQuestion}=useRequest(
    async ()=> await updateQuestionService(id,{isDeleted:1}),
    {
      manual:true,
      onSuccess(){
        message.success('删除成功');
        setIsDeletedState(true);
      }
    }
  )

  const del = () => {
    confirm({
      title: "确认删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => deleteQuestion(),
    });
  };

  if(isDeletedState) return null;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${id}` : `/question/edit/${id}`
              }
            >
              <Space>
                {isStarState ? <StarOutlined style={{ color: "red" }} />:<></>}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              <span>答卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${id}`)}
                disabled={!isPublished}
              >
                问卷统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
              <Popconfirm
                title="确认复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                  复制
                </Button>
              </Popconfirm>

              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
