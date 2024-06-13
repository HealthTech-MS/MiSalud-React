import React from "react";
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines, AreaSeries } from 'react-vis';

function StyledChart(props) {
    return (
        <XYPlot 
            animation={true} 
            xType="time" 
            width={props.width} 
            height={props.height} 
            yDomain={[0, props.maxRange]}
        >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis 
                title={props.xTitle} 
                tickFormat={v => new Date(v).toLocaleDateString()} 
                tickTotal={6}
            />
            <YAxis title={props.yTitle} />
            <AreaSeries 
                stroke="transparent" 
                data={props.data} 
                style={{}} 
                opacity={0.25}
            />
            <LineSeries 
                data={props.data} 
                opacity={1} 
                stroke="#12939a" 
                strokeStyle="solid"
            />
        </XYPlot>
    );
}

export default StyledChart;