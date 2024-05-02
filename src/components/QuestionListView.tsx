import React, { FC, useState } from "react";
import styles from "./QuestionCardView.module.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HighlightOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate, Link,useLocation } from "react-router-dom";
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
const QuestionListView: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const {pathname}=useLocation();
  const { confirm } = Modal;
  const { id, title, isPublished, answerCount, createdAt, isStar } = props;

  const [isStarState, setIsStarState] = useState(isStar);
  const [published, setPublished] = useState(isPublished);
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

  const { loading: changePublishLoading, run: changePublish } = useRequest(
    async () => {
      await updateQuestionService(id, { isPublished: !published?1:0 });
    },
    {
      manual: true,
      onSuccess(){
        message.success(!published?'已发布问卷':'已取消发布')
        setPublished(!published?1:0);
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
  return (!isStarState||pathname=="/manage/star"?
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                published ? `/question/stat/${id}` : `/question/edit/${id}`
              }
              
            >
              <Space>
      
                  <text style={isStarState ?{color:'red'}:{}}>
                  {title}
                  </text>
                  {published ? (
                <Tag color="processing">已发布</Tag>
              ) : (
                <Tag>未发布</Tag>
              )}
              </Space>
              <Space>
              
              <span>{createdAt}</span>
            </Space>
            </Link>
          </div>
          <div className={styles.right}>
          答卷份数：{answerCount}
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
                disabled={!!published}
              >
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${id}`)}
                disabled={!published}
              >
              </Button>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
              </Button>
              <Button
                type="text"
                icon={<HighlightOutlined /> }
                size="small"
                onClick={changePublish}
              >
                {published ? "取消发布" : "发布问卷"}
              </Button>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>
          

              
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
            
            </Space>
          </div>
        </div>
      </div>
    </>:<></>
  );
};
export default QuestionListView;
