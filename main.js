function graph(dataset) {
  
  let margin = 50;
  let w = 800;
  let h = 480;
  
  let tooltip = d3.select("#graph")
                  .append("div")
                  .attr("id", "tooltip")
                  .style("opacity", 0)
  
  let timeFormat = d3.timeFormat("%M:%S");
  let years = dataset.map(d => d.Year);
  let times = dataset.map(d => d3.timeParse("%M:%S")(d.Time));
  
  const xScale = d3.scaleLinear()
                   .domain([d3.min(years) - 1, d3.max(years) + 1])
                   .range([margin, w - margin]);
  
  const yScale = d3.scaleTime()
                   .domain([d3.max(times), d3.min(times)])
                   .range([h - margin, margin]);
  
  const svg = d3.select("#graph")
                .append("svg")
                .attr("align", "centre")
                .attr("width", w)
                .attr("height", h);
  
  const legend = svg.append("g")
                    .attr("id", "legend")
                    .attr('transform', 'translate(0, 40)');
  
  svg.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(-90)")
     .attr("x", -130)
     .attr("y", 11)
     .text("Time in minutes");
  
  svg.append("text")
     .attr("class", "text")
     .attr("x", w/2.5 + 320)
     .attr("y", h - 30)
     .text("Info: wikipedia.org");
  
  svg.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(90)")
     .attr("x", 30)
     .attr("y", -770)
     .style("fill", "blue")
     .text("Made by Milan V. Kecojević");
  
  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickFormat(d => d);
  
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickFormat(timeFormat);
  
  svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", `translate(0, ${h - margin - margin/2})`)
     .call(xAxis);
  
  svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", `translate(${margin}, ${-margin/2})`)
     .call(yAxis)
  
  svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("class", "dot")
     .attr("r", 5)
     .attr("cx", d => xScale(d.Year))
     .attr("cy", d => yScale(d3.timeParse("%M:%S")(d.Time)) - margin/2)
     .attr("data-xvalue", d => d.Year)
     .attr("data-yvalue", d => d3.timeParse("%M:%S")(d.Time))
     .attr("fill", d => d.Doping ? "red" : "blue")
     .on("mouseover", (d, i) => {         
       tooltip.transition()
              .duration(150)
              .style("opacity", 1)
              .attr("data-year", d.Year)
       tooltip.html(`${d.Name}: ${d.Nationality}<br/>Year: ${d.Year}, Time: ${d.Time}<br/>${d.Doping ? d.Doping : 'No doping allegations'}`)
              .style('left', `${d3.event.pageX - 460}px`)
              .style('top', `${d3.event.pageY - 40}px`)
     })
     .on("mouseout", d => {
       tooltip.transition()
              .duration(50)
              .style("opacity", 0)
     })
  
  legend.append("rect")
        .attr("x", 600)
        .attr("y", h - 490)
        .attr("width", 30)
        .attr("height", 15)
        .attr("fill", "red");
  
  legend.append("rect")
        .attr("x", 600)
        .attr("y", h - 460)
        .attr("width", 30)
        .attr("height", 15)
        .attr("fill", "blue");
  
  legend.append("text")
        .attr("x", 635)
        .attr("y", h - 480)
        .text("Doping allegations")
        .style("font-size", "0.7rem")
  
  legend.append("text")
        .attr("x", 635)
        .attr("y", h - 450)
        .text("No doping allegations")
        .style("font-size", "0.7rem")
     
}

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(json){
  const dataset = json;
  graph(dataset);
});
