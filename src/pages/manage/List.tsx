import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionListView";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Divider, Empty, FloatButton, Spin, Typography, message } from "antd";
import ListSearch from "../../components/ListSearch";
import {
  createQuestionService,
  getQuestionListService,
} from "../../services/question";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";
import QuestionListView from "../../components/QuestionListView";
import QuestionCardView from "../../components/QuestionCardView";
import {
  PlusOutlined,
  QuestionCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Waterfall from "../../components/WaterFall";
const { Title } = Typography;
const List: FC = () => {
  useTitle("问卷-----我的");
  const nav = useNavigate();

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false);
  const [isCardView, setIsCardView] = useState(false);

  const havaMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= window.innerHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    }
  );

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!havaMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, havaMoreData]);

  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  useEffect(() => {
    if (havaMoreData) window.addEventListener("scroll", tryLoadMore);
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, havaMoreData]);

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  const { run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result}`);
      message.success("创建成功");
    },
  });

  const listView = (
    <>
      {list.length > 0 &&
        list.map((q: any) => {
          const { id } = q;
          return <QuestionListView key={id} {...q} />;
        })}
    </>
  );
  const cardView = (
    <div>
      <Waterfall data={list} columnCount={3} />
      {/* <Divider />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          height: 2000,
          backgroundColor: "red",
        }}
      >
        {list.length > 0 &&
          list.map((q: any) => {
            const { id } = q;
            console.log('q',q);
            console.log('id',id);
            return <QuestionCardView key={id} {...q} />;
          })}
      </div> */}
    </div>
  );
  // const cardView = (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexWrap:"wrap",
  //       flexDirection: "column",
  //       height: 2000,
  //       backgroundColor:"red"
  //     }}
  //   >
  //     {list.length > 0 &&
  //       list.map((q: any) => {
  //         const { id } = q;
  //         return <QuestionCardView key={id} {...q} />;
  //       })}
  //   </div>
  // );

  return (
    <>
      <FloatButton.Group shape="circle" style={{ right: 40 }}>
        <FloatButton
          icon={<SwapOutlined />}
          onClick={() => setIsCardView(!isCardView)}
        />
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleCreateClick}
        />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
      <div className={styles.content}>{isCardView ? cardView : listView}</div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};
export default List;
