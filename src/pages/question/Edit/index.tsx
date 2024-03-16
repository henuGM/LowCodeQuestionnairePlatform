import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss"
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/ComponentsReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();
  const dispatch=useDispatch();
  useBindCanvasKeyPress();

  function clearSelectedId(){
    dispatch(changeSelectedId(''))
  }
  
  return (
    <div className={styles.container}>
      <div style={{backgroundColor:'#fff'}}>
        <EditHeader/>
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}><LeftPanel/></div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}/>
            </div>
          </div>
          <div className={styles.right}><RightPanel/></div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
