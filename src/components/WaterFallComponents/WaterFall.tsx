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
let heightMap = new Map();
let chaCount = 0;
let chaHeight: number[] = [];
let chaColumns: any[][] = [];

const Waterfall: React.FC<WaterfallProps> = ({ data, columnCount }) => {
  const [columns, setColumns] = useState<WaterfallState["columns"]>(
    Array.from({ length: columnCount }, () => [])
  );
  const [heights, setHeights] = useState<WaterfallState["heights"]>(
    Array.from({ length: columnCount }, () => 0)
  );
  const handleMeasure = (questionId: number, height: number) => {
    heightMap.set(questionId, height);
    if (heightMap.size == data.length) {
      beginWaterFall();
    }
  };

  function beginWaterFall() {
    const arr: any[][] = chaColumns;
    const height = chaHeight;
    for (let i = arr.flat().length; i < data.length; i++) {
      let item = data[i];
      const minHeightIndex = height.indexOf(Math.min(...height));
      arr[minHeightIndex].push(item);
      height[minHeightIndex] += heightMap.get(item.id);
      console.log("beginWaterFall", height, " ", item.id);
    }
    chaCount = 0;
    setColumns(arr);
    setHeights(height);
  }

  useEffect(() => {
    const arr: any[][] = columns;
    const height = heights.slice();
    if (arr.flat().length < data.length) {
      chaColumns = JSON.parse(JSON.stringify(columns));
      chaHeight = JSON.parse(JSON.stringify(height));
    }
    for (let index = arr.flat().length; index < data.length; index++) {
      chaCount++;
      let item = data[index];
      const minHeightIndex = height.indexOf(Math.min(...height));
      arr[minHeightIndex].push(item);
      height[minHeightIndex] += 100;
      console.log("useEffect", height, " ", item.id);
    }
    setColumns(arr);
    setHeights(height);
  }, [data]);

  return (
    <div style={{ display: "flex" }}>
      {columns.map((column) => (
        <div style={{ width: 400 }}>
          {column.map((obj) => {
            return (
              <QuestionCardView
                key={obj.id}
                {...obj}
                onMeasure={handleMeasure}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Waterfall;
