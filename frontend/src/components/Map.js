import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Map = () => {
  const d3Chart = useRef();

  // The visualisation is unfortunately done only halfway so did not include that in the UI :) Idea is ready in my mind
  const [data, setData] = useState(
    d3.range(10).map((_) => [Math.random(), Math.random()])
  );

  useEffect(() => {
    // Set up a container
    const w = 500;
    const h = 500;
    const svg = d3
      .select(d3Chart.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin", "40px")
      .attr("fill", "#676974") // Default color of dots
      .style("background-color", "#F8F8F8");

    // Set up scaling
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, w]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([h, 0]);

    // Set up axis
    const xAxis = d3.axisBottom(xScale).ticks(10);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    const yAxis = d3.axisLeft(yScale).ticks(10);
    svg.append("g").call(yAxis);

    // set up axis labelling
    svg
      .append("text")
      .attr("x", w / 2)
      .attr("y", h + 50)
      .text("x");

    svg
      .append("text")
      .attr("x", -40)
      .attr("y", h / 2)
      .text("y");

    svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 6); // radius is 2

    const even = svg
      .selectAll()
      .data(data)
      .filter((i) => i < 0.5);
    // console.log(even)
  }, []);


  return (
    <div id="d3Demo">
      <svg ref={d3Chart}></svg>
      <div>A chart displaying drones on a 2D map.</div>
    </div>
  );
};

export default Map;
