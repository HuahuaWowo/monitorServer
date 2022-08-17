import { Space, Table, Tag } from "antd";
import Tab from "../components/tag";
import React, { useState } from "react";
import { get } from "../../../../../util/axios";
import CheckHistory from "./history";
import "./bottomList.css";
import { useEffect } from "react";

const columns = [
  {
    title: "资源域名",
    dataIndex: "URL",
    key: "URL",
    width: 500,
  },
  {
    title: "错误资源类型",
    key: "tags",
    dataIndex: "tags",
    width: 10,
    render: (tags) => (
      <span>
        <Tag color={"red"} key={tags}>
          {tags.toUpperCase()}
        </Tag>
      </span>
    ),
  },
  {
    title: "异常次数",
    dataIndex: "number",
    key: "number",
    width: 100,
    sorter: {
      compare: (a, b) => a.number - b.number,
      multiple: 2,
    },
  },
  {
    title: "影响用户",
    dataIndex: "affectPeople",
    key: "affectPeople",
    width: 100,
    sorter: {
      compare: (a, b) => a.affectPeople - b.affectPeople,
      multiple: 1,
    },
  },
  {
    title: "最近一次触发",
    dataIndex: "lastTime",
    key: "lastTime",
    width: 100,
    sorter: {
      compare: (a, b) => new Date(a.lastTime) - new Date(b.lastTime),
      multiple: 1,
    },
  },

  {
    title: "操作",
    key: "action",
    width: 100,
    render: (_) => (
      <Space size="middle">
        <CheckHistory URL={_.URL}></CheckHistory>
      </Space>
    ),
  },
];
// const data = [
//   {
//     key: 0,
//     URL: "assets**com/ltvfe/cl/loan_records.e67a2f5e.chunk.js",
//     number: 32,
//     affectPeople: 21,
//     tags: ["js"],
//     lastTime: "2022-03-01",
//   },
//   {
//     key: 1,
//     URL: "assets**com/ltvfe/cl/auto_pay_result.7b37cf6f.png",
//     number: 42,
//     affectPeople: 55,
//     tags: ["media"],
//     lastTime: "2022-03-02",
//   },
//   {
//     key: 2,
//     URL: "assets**com/ltvfe/cl/auto_pay_result.7b37cf6f.png",
//     number: 32,
//     affectPeople: 41,
//     tags: ["img"],
//     lastTime: "2022-03-03",
//   },
//   {
//     key: 3,
//     URL: "https://sfa.demo-inc.com",
//     number: 32,
//     affectPeople: 66,
//     tags: ["media"],
//     lastTime: "2022-03-05",
//   },
//   {
//     key: 4,
//     URL: "assets**com/ltvfe/cl/loan_records.e67a2f5e.chunk.js",
//     number: 32,
//     affectPeople: 71,
//     tags: ["JS"],
//     lastTime: "2022-03-11",
//   },
//   {
//     key: 5,
//     URL: "assets**com/ltvfe/cl/auto_pay_result.7b37cf6f.png",
//     number: 32,
//     affectPeople: 66,
//     tags: ["img"],
//     lastTime: "2022-03-21",
//   },
//   {
//     key: 6,
//     URL: "assets**com/ltvfe/cl/app.57193489.css",
//     number: 32,
//     affectPeople: 35,
//     tags: ["css"],
//     lastTime: "2022-05-11",
//   },
//   {
//     key: 7,
//     URL: "assets**com/ltvfe/cl/app.57193489.css",
//     number: 32,
//     affectPeople: 18,
//     tags: ["CSS"],
//     lastTime: "2022-07-07",
//   },
//   {
//     key: 8,
//     URL: "assets**com/ltvfe/cl/loan_records.e67a2f5e.chunk.js",
//     number: 32,
//     affectPeople: 62,
//     tags: ["media"],
//     lastTime: "2022-07-15",
//   },
//   {
//     key: 9,
//     URL: "assets**com/ltvfe/cl/loan_records.e67a2f5e.chunk.js",
//     number: 32,
//     affectPeople: 42,
//     tags: ["JS"],
//     lastTime: "2022-07-27",
//   },
//   {
//     key: 10,
//     URL: "assets**com/ltvfe/cl/auto_pay_result.7b37cf6f.png",
//     number: 32,
//     affectPeople: 52,
//     tags: ["img"],
//     lastTime: "2022-07-31",
//   },
// ].reverse();
const BottomList = () => {
  const [data, setData] = useState([]);
  const getTableData = async () => {
    const newData = [];
    const result = await get("/staticError/gettabledata");
    for (let item of result.data) {
      newData.push({
        key: Number(item.id),
        URL: item.page,
        tags: item.selector,
        number: item["count(*)"],
        affectPeople: item["count(distinct user_id)"],
        lastTime: item["max(create_time)"].substring(0, 10),
      });
    }
    setData(newData);
  };
  useEffect(() => {
    getTableData();
    // table(newData);
  }, []);
  return (
    <div className="bottomList">
      <div className="tab">
        <Tab text="资源错误列表"></Tab>
      </div>
      <div>
        <Table className="table" columns={columns} dataSource={data}></Table>
      </div>
    </div>
  );
};

export default BottomList;
