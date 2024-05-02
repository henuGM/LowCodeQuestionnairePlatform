import React, { DetailedHTMLProps, FC, HTMLAttributes, LegacyRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
// import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetComponentInfo from "../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../components/QuestionComponents/index";
import styles from "./QuestionCardComponentView.module.scss";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

type PropsType = {
  id: number;
  selectedComponentId: string;
  componentListString: string;
  callback: () => void;
};

const QuestionCardComponentView: FC<PropsType> = (props) => {
  const { id, selectedComponentId, componentListString,callback } = props;
  const nav = useNavigate();
  const ref=useRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>()
  const componentList = JSON.parse(componentListString);

  // useLayoutEffect(() => {
  //   console.log('加载完了？');
  //   if(componentListString.length>5){
  //     callback(true);
  //   }else{
  //     callback(false);
  //   }
  // }, []);
  const [flag,setFlag]=useState(false);
  const timer=setTimeout(()=>{
    setFlag(true);
  },1000)

  useEffect(() => {
    if(flag||componentListString.length > 5){
      // setTimeout(()=>{
      clearTimeout(timer);
        callback();
      // },1000)
    }
  }, [componentListString,flag]);

  return componentListString.length > 5 ? (
    <div className={styles.container}>
      {componentList
        .filter((c: { isHidden: any }) => !c.isHidden) // 过滤隐藏的组件
        .map((c: { fe_id: any; props: any; type: any }) => {
          const { fe_id, props, type } = c;

          const componentConf = getComponentConfByType(type);
          if (componentConf == null) return null;

          const { Component } = componentConf;

          // 拼接 class name
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
    </div>
  ) : (
    <div style={{ marginTop: 40 }}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
      >
        <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
          添加组件
        </Button>
      </Empty>
    </div>
  );
};

export default QuestionCardComponentView;
