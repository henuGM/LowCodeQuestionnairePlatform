import React, { FC } from "react";
import { Typography } from "antd";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";

const { Title } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const {
    text = "",
    level = 1,
    isCenter = false,
  } = { ...QuestionTitleDefaultProps, ...props };
  const genFontSize = (level: number) => {
    if (level === 1) return "24px";
    if (level === 2) return "20px";
    if (level === 3) return "16px";
    return "16px";
  };
  const genMarginBottom = (level: number) => {
    if (level === 1) return "5px";
    if (level === 2) return "2px";
    if (level === 3) return "-1px";
    return "0px";
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? "center" : "start",
        fontSize: genFontSize(level),
        // lineHeight:1,
        height:'22px',
        marginTop:"0px",
        marginBottom:genMarginBottom(level)
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
