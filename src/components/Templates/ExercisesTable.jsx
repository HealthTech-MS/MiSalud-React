

import React from "react";
import { Table } from 'antd';

const ExercisesTable = ({ exercises }) => {
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
            title: 'Duración',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration) => `${duration} mins`,
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
            dataSource={exercises}
            pagination={false}
            rowKey="id"
            scroll={{ y: 240 }} // Altura máxima para mostrar el scroll
        />
    );
};

export default ExercisesTable;