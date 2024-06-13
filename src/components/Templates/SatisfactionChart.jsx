import React from "react";
import { XYPlot, VerticalBarSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

function SatisfactionChart({ data, width, height, currentPage, itemsPerPage }) {
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedData = data.slice(startIdx, endIdx);

    return (
        <XYPlot
            xType="ordinal"
            width={width}
            height={height}
            yDomain={[0, 3]}
        >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis title="Meals" />
            <YAxis title="Score" />
            <VerticalBarSeries
                data={paginatedData}
                barWidth={0.5}
            />
        </XYPlot>
    );
}

export default SatisfactionChart;