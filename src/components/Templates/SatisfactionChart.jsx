import React from "react";
import { XYPlot, VerticalBarSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

function SatisfactionChart({ data, width, height }) {
    return (
        <XYPlot 
            xType="ordinal"
            width={width} 
            height={height} 
            yDomain={[0, 3]} 
        >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis title="Score" />
            <VerticalBarSeries 
                data={data} 
                barWidth={0.5}
            />
        </XYPlot>
    );
}

export default SatisfactionChart;