import React from "react";
import { Card, Col, Row, Space } from 'antd';

function NumberCard(props){
    return(
        <Card title={props.title} style={{ width: 200, height: 90, textAlign: "center" }} size="small">
            <p style={{ fontWeight: "bold", fontSize: "24px", margin: -5}}>{props.value}</p>
        </Card>
    )
}

export default NumberCard
