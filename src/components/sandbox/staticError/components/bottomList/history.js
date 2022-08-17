import { Button, Modal, Table } from "antd";
import { get } from "../../../../../util/axios";
import React, { useState } from "react";
import { useEffect } from "react";

const CheckHistory = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "报错时间",
      dataIndex: "Time",
      key: "Time",
      width: 100,
      sorter: {
        compare: (a, b) => new Date(a.Time) - new Date(b.Time),
        multiple: 1,
      },
    },
    {
      title: "用户IP",
      dataIndex: "ip",
      key: "ip",
      width: 100,
    },
    {
      title: "网络类型",
      dataIndex: "kind",
      key: "kind",
      width: 100,
    },
    {
      title: "客户端",
      dataIndex: "client",
      key: "client",
      width: 100,
    },
    {
      title: "运营商",
      dataIndex: "type",
      key: "type",
      width: 100,
    },
  ];
  useEffect(() => {
    const getDetailData = async () => {
      const newData = [];
      const result = await get(`/staticError/getdetail?page=${props.URL}`);
      let index = 0;
      for (let item of result.data) {
        newData.push({
          key: index,
          Time: item.create_time,
          ip: item.user_id,
        });
        index++;
      }
      setData(newData);
    };
    getDetailData();
  }, [props]);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        查看详情
      </Button>
      <Modal
        title="查询历史"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1800}
      >
        <Table className="table" columns={columns} dataSource={data} />
      </Modal>
    </>
  );
};

export default CheckHistory;
