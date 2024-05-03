import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";
import { useRequest } from "ahooks";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from "../constant";
type OptionType = {
  isStar: number;
  isDeleted: number;
  pageSize: number;
};
function useLoadingQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted, pageSize=0 } = opt;
  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
      const temp = pageSize==0?
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
        LIST_PAGE_SIZE :pageSize

      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize:temp,
      });
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );
  return { data, loading, error, refresh };
}
export default useLoadingQuestionListData;
