import React, { useEffect, useRef, useState } from "react";
import { Card, Divider, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionService } from "../../services/question";
import QuestionCardComponentView from "./QuestionCardComponentView";

const { Meta } = Card;

type PropsType = {
  id: number;
  title: string;
  isStar: number;
  isPublished: number;
  answerCount: number;
  createdAt: string;
  onMeasure: (id: number, height: number) => void; // 新增回调，用于传递尺寸信息
};

const QuestionCardView: React.FC<PropsType> = (props) => {
  const nav = useNavigate();
  const { id, onMeasure, title, answerCount, isPublished } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [componentList, setComponentList] = useState("[]");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    run();
  }, []);

  const onLoadingCallback = () => {
    const measureHeight = () => {
      if (cardRef.current) {
        const height = cardRef.current.clientHeight;
        onMeasure(id, height);
      }
    };
    measureHeight();
    setIsVisible(true);
  };

  const { run } = useRequest(
    async () => {
      return await getQuestionService(id);
    },
    {
      manual: true,
      onSuccess(obj) {
        const { componentList } = obj;
        setComponentList(componentList);
      },
    }
  );
  return (
    <Card
      ref={cardRef}
      hoverable
      style={
        isVisible
          ? {
              width: "90%",
              marginLeft: "20px",
              marginBottom: "20px",
              boxSizing: "border-box",
            }
          : {
              width: "90%",
              marginLeft: "20px",
              marginBottom: "20px",
              boxSizing: "border-box",
              visibility: "hidden",
            }
      }
      cover={
        <QuestionCardComponentView
          id={id}
          selectedComponentId="1"
          componentListString={componentList}
          callback={onLoadingCallback}
          isPublished={isPublished}
        />
      }
    >
      <Divider></Divider>
      <Meta
        style={{ borderWidth: 1 }}
        title={
          <Space>
            {title}
            <Tag color="#108ee9">ID:{id}</Tag>
            {isPublished ? (
              <Tag color="#87d068">已发布</Tag>
            ) : (
              <Tag color="#f50">未发布</Tag>
            )}
          </Space>
        }
        description={`已填写：${answerCount} 份`}
      />
    </Card>
  );
};
export default QuestionCardView;
