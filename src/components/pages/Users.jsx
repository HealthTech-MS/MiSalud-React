import React from "react";
import StyledChart from "../Templates/StyledChart";
import { Row, Col, Space } from "antd"
import FixedTable from "../Templates/FixedTable";
import NumberCard from "../Templates/NumberCard";

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

function Users(){

    const data = [
        {x: new Date('01/01/2018'), y: 75},
        {x: new Date('01/14/2018'), y: 60},
        {x: new Date('03/18/2018'), y: 80},
        {x: new Date('04/15/2018'), y: 90}
    ]

    return(
        <>
            <h1>Users Page</h1>
        </>
    )
}

export default Users