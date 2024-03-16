import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/ComponentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    run(id);
  }, [id]);

  async function load(id: string) {
    if (!id) throw new Error("没有问卷ID");
    const data = await getQuestionService(id);
    return data;
  }

  const { loading, data, error, run } = useRequest(load, { manual: true });

  useEffect(() => {
    if (!data) return;
    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      isPublished = false,
      componentList = [],
    } = data;
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
  }, [data]);
  return { loading, data, error };
}
export default useLoadQuestionData;
