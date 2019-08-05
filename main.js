function graph(dataset) {
  
  let margin = 50;
  let w = 800;
  let h = 480;
  let dotRadius = 6;
  
  let tooltip = d3.select("#graph")
                  .append("div")
                  .attr("id", "tooltip")
                  .style("opacity", 0)
  
  let years = dataset.map(d => d.Year);
  let times = dataset.map(d => d.Seconds);
  let timeFormat = d3.timeFormat("%M:%S");
  
  const xScale = d3.scaleLinear()
                   .domain([d3.min(years) - 1, d3.max(years) + 1])
                   .range([margin, w - margin]);
  
  const yScale = d3.scaleTime()
                   .domain([d3.min(times) - 60, d3.max(times) + 60])
                   .range(h - margin, h);
  
  const svg = d3.select("#graph")
                .append("svg")
                .attr("align", "centre")
                .attr("width", w)
                .attr("height", h);
  
  svg.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(-90)")
     .attr("x", -200)
     .attr("y", 70)
     .text("Time in minutes");
  
  svg.append("text")
     .attr("class", "text")
     .attr("x", w/2.5 + 220)
     .attr("y", h - 10)
     .text("Info: wikipedia.org");
  
  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickFormat(d3.format("d"));
  
  const yAxis = d3.axisLeft()
                  .scale(yScale)
  
  svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", "translate(0, " + (h - margin) + ")")
     .call(xAxis);
  
  svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", "translate(" + 5 + "0)")
     .call(yAxis);
  
} //end of graph func

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(json){
  const dataset = json;
  console.log(dataset);
  graph(dataset);
});
