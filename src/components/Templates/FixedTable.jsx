import React from "react";
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 10,
  },
  {
    title: 'Primer Nombre',
    dataIndex: 'firstName',
    width: 25,
  },
  {
    title: 'Apellido Paterno',
    dataIndex: 'lastName',
    width: 25,
  },
  {
    title: 'Numero de Telefono',
    dataIndex: 'phoneNumber',
    width: 150,
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  // },
];


function FixedTable(props){
  return( <Table loading={props.loading} columns={columns} dataSource={props.data} pagination={{ pageSize: 25, }} scroll={{ y: 325 }}/> )
}

export default FixedTable