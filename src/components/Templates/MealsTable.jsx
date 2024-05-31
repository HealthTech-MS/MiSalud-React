import React from "react";
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 10,
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    width: 25,
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    width: 50,
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    width: 50,
  },
  {
    title: 'Puntuación',
    dataIndex: 'score',
    width: 25,
  },
  {
    title: 'Fecha de Creación',
    dataIndex: 'createdAt',
    width: 50,
  },
  {
    title: 'Fecha de Actualización',
    dataIndex: 'updatedAt',
    width: 50,
  },
];

function MealsTable(props) {
  return (
    <Table
      loading={props.loading}
      columns={columns}
      dataSource={props.data}
      pagination={{ pageSize: 10 }}
      scroll={{ y: 325 }}
      rowKey="id"
    />
  );
}

export default MealsTable;