import React, { useEffect, useState } from 'react';
import XYAxis from './XYAxis';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { scaleLinear, scaleBand } from 'd3-scale';
import Line from './Line';
import { getSeansPopularity } from '../../Requests/seans';

export default function PopularChart({ id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSeansPopularity(id).then((json) => {
      const n = json.map((x) => {
        return { name: x._id, value: x.count };
      });
      if (json.length > 0)
        n.push({ name: '', value: json[json.length - 1].count });
      setData(n.length ? n : [{ name: '', value: 0 }]);
    });
  }, []);

  if (data.length > 0) {
    const parentWidth = 1000;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 40,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([0, width])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, (d) => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(curveMonotoneX);

    return (
      <div>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line
              data={data}
              xScale={xScale}
              yScale={yScale}
              lineGenerator={lineGenerator}
              width={parentWidth}
              height={height}
            />
          </g>
        </svg>
      </div>
    );
  }

  return <></>;
}
