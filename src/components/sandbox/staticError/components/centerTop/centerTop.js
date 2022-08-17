import Tab from "../components/tag";
import React, { useEffect } from "react";
import { get } from "../../../../../util/axios";
import { Pie } from "@antv/g2plot";
// {type: 'img', value: 40}
// 1: {type: 'JS', value: 35}
// 2: {type: 'CSS', value: 25}
// 3: {type: 'media', value: 25}
const CenterTop = () => {
  const makePie = (data) => {
    const piePlot = new Pie("mypie", {
      height: 300,
      data,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      legend: false,
      label: {
        style: {
          opacity: 0.6,
          fontSize: 12,
        },
        type: "spider",
        labelHeight: 20,
        content: "{name}\n{percentage}",
      },
      interactions: [{ type: "element-selected" }, { type: "element-active" }],
    });
    piePlot.render();
  };
  useEffect(() => {
    const data = [];
    const getPieData = async () => {
      const result = await get("/staticError/getpiedata");
      for (let item of result.data) {
        data.push({
          type: item.selector,
          value: item["count(*)"],
        });
      }
      makePie(data);
    };
    getPieData();
  },[]);
  return (
    <>
      <Tab text="资源类型"></Tab>
      <div id="mypie"></div>
    </>
  );
};

export default CenterTop;
