import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/QuestionComponents";
import { changeComponentProps } from "../../../store/ComponentsReducer";
import { useDispatch } from "react-redux";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;
  const { PropComponent } = componentConf;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return (
    <PropComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
};

export default ComponentProp;
