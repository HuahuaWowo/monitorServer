import Tab from "../components/tag";
import React, { useState, useEffect } from "react";
import { get } from "../../../../../util/axios";
import { TeamOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./rightTop.css";
function RightTop() {
  const [affectTotal, setAffectTotal] = useState(0);
  const [affectNumber, setAffectNumber] = useState(0);
  const getCount = async () => {
    const result = await get("/staticError/getcount");
    setAffectNumber(Object.values(result.data[0])[1]);
    setAffectTotal(Object.values(result.data[0])[0]);
  };
  useEffect(() => {
    getCount();
  }, []);
  return (
    <>
      <Tab text="今日概况"></Tab>
      <div className="icon">
        <TeamOutlined />
        <div>影响用户次数</div>
        <div>{affectNumber}次</div>
      </div>
      <div className="icon">
        <ExclamationCircleOutlined />
        <div>总发生次数</div>
        <div>{affectTotal}次</div>
      </div>
    </>
  );
}

export default RightTop;
