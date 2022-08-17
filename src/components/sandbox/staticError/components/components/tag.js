import { Tabs } from "antd";
import React from "react";
import "./tag.css";
const { TabPane } = Tabs;
const Tab = (props) => (
  <Tabs defaultActiveKey="1">
    <TabPane tab={<span className="text">{props.text}</span>} key="1"></TabPane>
  </Tabs>
);

export default Tab;

