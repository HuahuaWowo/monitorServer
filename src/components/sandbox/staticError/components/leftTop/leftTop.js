import React, { useRef, useEffect } from "react";
import { get } from "../../../../../util/axios";
import Tab from "../components/tag";
import { Chart } from "@antv/g2";
import "./leftTop.css";

function LeftTop() {
  const ref = useRef(null);
  
  useEffect(() => {
    const data = [];
    const getBarData=async()=>{
      const result=await get("/staticError/getbardata")
      for (let item of result.data) {
        data.push({
          year: item.create_time.substring(5, 10),
          sales: item["count(*)"],
        });
      }
      makeBar(data);
    }
   getBarData()
  },[]);
  const makeBar = (data) => {
    const chart = new Chart({
      container: ref.current,
      autoFit: true,
      height: 200,
      width: 300,
    });
    chart.data(data);
    chart.scale("sales", {
      nice: true,
    });

    chart.tooltip({
      showMarkers: false,
    });
    chart.interaction("active-region");

    chart.interval().position("year*sales");
    chart.render();
  };
  return (
    <>
      <Tab text="资源加载错误"></Tab>
      <div ref={ref} className="bar" />
    </>
  );
}

export default LeftTop;
