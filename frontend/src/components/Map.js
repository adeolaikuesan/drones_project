import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3';

const ChartPlot = () => {
    const d3Chart = useRef()

    const [data, setData] = useState(
        d3.range(10).map(_ => [Math.random(), Math.random()])
      );

    useEffect(() => {

          // Set up a container
          const w = 500
          const h = 500
          const svg =  d3.select(d3Chart.current)
          .attr('width', w)
          .attr('height', h)
          .style('overflow', 'visible')
          .style('margin', '40px')
          .attr("fill", "#676974") // Default color of dots
          .style("background-color", "#F8F8F8")

          // Set up scaling 
          const xScale = d3.scaleLinear()
          .domain([0,1])
          .range([0, w])

          const yScale = d3.scaleLinear()
          .domain([0,1])
          .range([h, 0])

          // Set up axis
          const xAxis = d3.axisBottom(xScale).ticks(10)
          svg.append('g')
          .call(xAxis)
          .attr('transform', `translate(0, ${h})`)
          const yAxis = d3.axisLeft(yScale).ticks(10)
          svg.append('g')
          .call(yAxis)

          // set up axis labelling
          svg.append("text")
          .attr("x", w/2)
          .attr("y", h+ 50)
          .text('x')

          svg.append("text")
          .attr("x", -40)
          .attr("y", h/2)
          .text('y')

          svg.selectAll()
          .data(data)
          .enter()
          .append('circle')
            .attr('cx', d =>  xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('r', 6) // radius is 2

            const even = svg.selectAll().data(data).filter(i => i < 0.5)
            console.log(even)
      }, [])
    
    // const distances =  data.map( i => Math.sqrt( (0.5 - i[0])*(0.5 - i[0]) + (0.5 - i[1])*(0.5 - i[1])))

   

    return (
        <div id = "d3Demo">
            <svg ref = {d3Chart}></svg>
            <div>Distanceaepkapekjgaopj</div>
        </div>
      
    )
}

export default ChartPlot