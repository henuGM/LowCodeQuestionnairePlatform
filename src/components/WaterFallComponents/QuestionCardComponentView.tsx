import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { getComponentConfByType } from "../QuestionComponents/index";
import styles from "./QuestionCardComponentView.module.scss";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

type PropsType = {
  id: number;
  selectedComponentId: string;
  componentListString: string;
  isPublished: number;
  callback: () => void;
};

const QuestionCardComponentView: FC<PropsType> = (props) => {
  const {
    id,
    selectedComponentId,
    componentListString,
    isPublished,
    callback,
  } = props;
  const nav = useNavigate();
  const ref =
    useRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>();
  const componentList = JSON.parse(componentListString);

  const [flag, setFlag] = useState(false);
  const timer = setTimeout(() => {
    setFlag(true);
  }, 100);

  useEffect(() => {
    if (flag || componentListString.length > 5) {
      clearTimeout(timer);
      callback();
    }
  }, [componentListString, flag]);

  return componentListString.length > 5 ? (
    <div className={styles.container}>
      {componentList
        .filter((c: { isHidden: any }) => !c.isHidden) // 过滤隐藏的组件
        .map((c: { fe_id: any; props: any; type: any }) => {
          const { fe_id, props, type } = c;
          const componentConf = getComponentConfByType(type);
          if (componentConf == null) return null;
          const { Component } = componentConf;
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId, // 是否选中
          });

          return (
            <div className={wrapperClassName} key={fe_id} onClick={() => {}}>
              <div className={styles.component}>
                <Component {...props}></Component>
              </div>
            </div>
          );
        })}
      <div>
        <Button
          type="dashed"
          onClick={() => {
            if (isPublished) {
              nav(`/question/stat/${id}`);
            } else {
              nav(`/question/edit/${id}`);
            }
          }}
          block
        >
          {isPublished ? "查看" : "编辑"}
        </Button>
      </div>
    </div>
  ) : (
    <div style={{ marginTop: 40 }}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
      >
        <Button
          type="primary"
          onClick={() => {
            if (isPublished) {
              nav(`/question/stat/${id}`);
            } else {
              nav(`/question/edit/${id}`);
            }
          }}
        >
          {isPublished ? "查看数据" : "添加组件"}
        </Button>
      </Empty>
    </div>
  );
};

export default QuestionCardComponentView;
