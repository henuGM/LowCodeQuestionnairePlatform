import React, { FC } from "react";
import { Typography } from "antd";
import {
  ComponentConfType,
  componentConfGroup,
} from "../../../components/QuestionComponents";
import styles from "./ComponentLib.module.scss";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/ComponentsReducer";
import { nanoid } from "nanoid";

const { Title } = Typography;

function GenComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c;
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  }
  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId} >
            <Title
              level={3}
              style={{
                fontSize: "16px",
                marginTop: index > 0 ? "6px" : "0px",
              }}
            >
              {groupName}
            </Title>
            {components.map((c) => GenComponent(c))}
          </div>
        );
      })}
    </>
  );
};

export default Lib;
