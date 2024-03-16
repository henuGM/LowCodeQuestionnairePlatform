import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "../store/ComponentsReducer";
import { ActionCreators as UndoActionCreators } from "redux-undo";

function isActiveElementValid() {
  const activeElem = document.activeElement;

  if (activeElem == document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;

  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });

  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });

  useKeyPress("upArrow", () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  useKeyPress("downArrow", () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true,
    }
  );

  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
