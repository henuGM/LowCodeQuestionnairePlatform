import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from "./QuestionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextareaConf, {
  QuestionTextareaPropsType,
} from "./QuestionTextarea";
import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from "./QuestionRadio";
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,QuestionCheckboxStatPropsType
} from "./QuestionCheckbox";

export type ComponentPropsType = QuestionInputPropsType &
QuestionTitlePropsType &
QuestionParagraphPropsType &
QuestionInfoPropsType &
QuestionTextareaPropsType &
QuestionRadioPropsType &
QuestionCheckboxPropsType

  type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
  StatComponent?: FC<ComponentStatPropsType>
};

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

export const componentConfGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: "chooseGroup",
    groupName: "用户选择",
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
