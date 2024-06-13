import React from "react";
import { Table } from 'antd';

const MealsTable = ({ meals }) => {
  const columns = [
      {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
      },
      {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: 'Tipo',
          dataIndex: 'type',
          key: 'type',
      },
      {
          title: 'Fecha',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (text) => new Date(text).toLocaleString(),
      },
  ];

  return (
      <Table
          columns={columns}
          dataSource={meals}
          pagination={false}
          rowKey="id"
      />
  );
};

export default MealsTable;