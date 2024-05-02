import React, {
  FC,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Card, Divider, Modal, Space, Tag, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionService } from "../services/question";
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

const QuestionCardView: React.FC<PropsType> = forwardRef<
  HTMLDivElement,
  PropsType
>((props, ref) => {
  const nav = useNavigate();
  const { id, onMeasure, title, isPublished, answerCount, createdAt, isStar } =
    props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isStarState, setIsStarState] = useState(isStar);
  const [published, setPublished] = useState(isPublished);
  const [componentList, setComponentList] = useState("[]");

  useEffect(() => {
    run();
  }, []);

  // useLayoutEffect(() => {
  const onLoadingCallback = () => {

    const measureHeight = () => {
      if (cardRef.current) {
        const height = cardRef.current.clientHeight;
        onMeasure(id, height);
      }
    };
    measureHeight();
  };

  const { loading: changeStarLoading, run } = useRequest(
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
      style={{
        width: "90%",
        marginLeft: "20px",
        marginBottom: "20px",
        boxSizing: "border-box",
      }}
      cover={
        <QuestionCardComponentView
          id={id}
          selectedComponentId="1"
          componentListString={componentList}
          callback={onLoadingCallback}
        />
      }
    >
      <Divider></Divider>
      <Meta
        style={{ borderWidth: 1 }}
        title={<Space>{title}<Tag color="#108ee9">ID:{id}</Tag></Space>}
        description={`已填写问卷：${answerCount} 份`}
      />
      
    </Card>
  );
});
export default QuestionCardView;
