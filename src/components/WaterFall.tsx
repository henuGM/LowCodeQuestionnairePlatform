import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
  useLayoutEffect,
} from "react";
import QuestionCardView from "./QuestionCardView";
import "./WaterFall.module.scss";
interface WaterfallProps {
  data: any[];
  columnCount: number;
}

interface WaterfallState {
  columns: any[][];
  heights: number[];
}
const heightMap=new Map();

const Waterfall: React.FC<WaterfallProps> = ({ data, columnCount }) => {
  const [columns, setColumns] = useState<WaterfallState["columns"]>(
    Array.from({ length: columnCount }, () => [])
  );
  const [heights, setHeights] = useState<WaterfallState["heights"]>(
    Array.from({ length: columnCount }, () => 0)
  );
  const childRefs = useRef(data.map(() => createRef<HTMLLIElement>()));
  // const childRefs = useRef<any>([]);
  const handleMeasure = useCallback((questionId: number, height: number) => {
    // 在这里处理每个QuestionCardView的尺寸信息，例如更新某个状态或重新计算布局
    console.log(`Question ID: ${questionId}, Height: ${height}`);
    // 根据需要实现具体的逻辑
    heightMap.set(questionId,height);
    if(heightMap.size==data.length){
      beginWaterFall();
    }
    console.log(heightMap);
  }, []);
  
  const beginWaterFall=()=>{
    setColumns(Array.from({ length: columnCount }, () => [])); //初始化[[],[],[]];
    const arr: any[][] = Array.from({ length: columnCount }, () => []);
    const height = Array.from({ length: columnCount }, () => 0);
    data.forEach((item, index) => {
      const minHeightIndex = height.indexOf(Math.min(...height));
      arr[minHeightIndex].push(item);
      height[minHeightIndex] += heightMap.get(item.id);
    });
    setColumns(arr);
    setHeights(height);
  }

  useLayoutEffect(() => {
      setColumns(Array.from({ length: columnCount }, () => [])); //初始化[[],[],[]];
      const arr: any[][] = Array.from({ length: columnCount }, () => []);
      const height = Array.from({ length: columnCount }, () => 0);
      data.forEach((item, index) => {
        const minHeightIndex = height.indexOf(Math.min(...height));
        arr[minHeightIndex].push(item);
        height[minHeightIndex] += Math.random() * 100 + 1;
      });
      setColumns(arr);
      setHeights(height);
  }, [data]);
  let count = 0;
  return (
    <div style={{ display: "flex" }}>
      {columns.map((column) => (
        <div
          style={
            childRefs.current.length > 0
              ? { width: 400 }
              : { width: 400, visibility: "hidden" }
          }
        >
          {column.map((obj) => {
            return (
              <QuestionCardView
                key={obj.id}
                {...obj}
                onMeasure={handleMeasure}
              />
            );
          })}
          <div style={{ height: 5, backgroundColor: "red" }}></div>
        </div>
      ))}
    </div>
  );
};

export default Waterfall;
