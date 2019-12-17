
var margin = { top: 200, right: 20, bottom: 350, left: 50 },
    width = 1920 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var svg = d3.select('#myDiagram')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background', '#e1ebe6')

svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 600)
    .attr('r', 50)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');
  
  
