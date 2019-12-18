var day = [];
var hour = [];
var mag =[];
var depth =[];
var myColor;
var tooltip;

var format = d3.format(".4n");

var margin = { top: 100, right: 50, bottom: 200, left: 50 },
    width = 1440 - margin.left - margin.right,
    height = 920 - margin.top - margin.bottom;

var svg = d3.select('#myDiagram')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.bottom)
            .style('background', '#F5F4EE')
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// svg.append('circle')
//     .attr('cx', 100)
//     .attr('cy', 600)
//     .attr('r', 50)
//     .attr('stroke', 'black')
//     .attr('fill', '#69a3b2');
  
  
var day = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29","30"]
var hour = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]


// Build X scales and axis:
x = d3.scaleBand()
    .range([ 0, width ])
    .domain(day)
    .padding(0.05);
 svg.append("g")
    .call(d3.axisBottom(x).tickSize(0))
    .style("font-size", 12)
    .attr("transform", "translate(0," + height + ")")
    .style("stroke", '#B5B4B4')
    .select(".domain").remove()
 
 
         
// Build Y scales and axis:
y = d3.scaleBand()
    .range([ height-30, 0 ])
    .domain(hour)
    .padding(0.05);
 svg.append("g")
    .style("font-size", 12)
    .call(d3.axisLeft(y).tickSize(0))
    .attr("transform", "translate(" + 1370 + ",0)")
    .style("stroke", '#B5B4B4')
    .select(".domain").remove()


//mag
w = d3.scaleLinear()
  .domain([4.5, 6.8])
  .range([0, 20]);
  
//depth
h = d3.scaleLinear()
  .domain([4, 574])
  .range([1, 20]);
  
//depth error
me = d3.scaleLinear()
  .domain([0.023, 0.383])
  .range([1, 20]);  
  
//depth error
de = d3.scaleLinear()
  .domain([0.2, 20.7])
  .range([1, 20]);


// Build color scale
myColor = d3.scaleLinear()
    .domain([4.5, 6.8])
    .range(["#3D4DE0", "#ff7800"]);


// Build color scale
// myColor = d3.scaleSequential()
//     .interpolator(d3.interpolateMagma)
//     .domain([0, 10])


tooltip = d3.select("#myDiagram")
    .append("div")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "0px")
    .style("border-radius", "2px")
    .style("padding", "8px")

    



    


//Section to Draw Earthquake Box & Error Line
d3.json('data/4.5_month.json', function(d){
        
    for (var i=0; i<d.length; i++){
        day.push(d[i].day)
        hour.push(d[i].hour)
        mag.push(d[i].mag)
        depth.push(d[i].depth)
    }


    //Tooltip for earthquake box    
    var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("opacity", 1)
      .attr("width",40)

      .attr("height", 20)
    }
      
    var mousemove = function(d) {
        tooltip
          .html(d.place+ 
          "<br>Depth: "+ ""+format(d.depth)+""+" kms"+
          "<br>Magnitude: "+ ""+ d.mag
          )
          .style("left",  d.day*40 + "px")     
          .style("bottom", d + "px");
      }
      
    var mouseleave = function(d) {
        tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 1)
          .attr("height", function(d){
              return h(d.depth)
          })
          .attr("width", 40)
      }
    
    
    
    
    
    
      
    //Tooltip for error lines   
    var mouseover2 = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .attr("y2", function(d){
          return y(d.hour)+de(d.depthError)+40
      })
      .style("stroke-width", 4)
    }
      
    var mousemove2 = function(d) {
        tooltip
          .html(d.place+ 
          "<br>magError: "+ ""+d.magError+
          "<br>depthError: "+ ""+ d.depthError
          )
        //   .html("<h4>Selected Earthquake</h4>"+ 
        //   "<br><h4>Depth:</h4>"+ "<h4>"+format(d.depth)+"</h4>"+" <h4>kms</h4>"+
        //   "<br><h4>Magnitude:</h4>"+ "<h4>"+ d.mag+"</h4>"
        //   )
          .style("left",  d.day*40 + "px")     
          .style("bottom", d + "px");
      }
      
    var mouseleave2 = function(d) {
        tooltip
          .style("opacity", 0)
        d3.select(this)
          .attr("y2", function(d){
              return y(d.hour)+de(d.depthError)
          })
          .style("stroke-width", 1.5)
      }  
  
  
  
  
    
    
    
    
    //Draw Depth boxes    
    svg.selectAll('rect')
    .data(d)
    .enter()
    .append("rect")
      .attr("class", "depBox")
      .attr("x", function(d){
          return x(d.day)
      })
      .attr("y", function(d){
          return y(d.hour)
      })
      .attr("rx", 1)
      .attr("ry", 1)
      .attr("height", function(d){
          return h(d.depth)
      })
      .attr("width", 40)
      .style("fill",function(d){
          return myColor(d.mag)
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 1)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
 
 
    //Draw Depth Boxes Outline  
    d3.select('#myDiagram svg')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
       .selectAll('rect')
       .data(d)
       .enter()
       .append('rect')
        .attr("class", "depBox")
        .attr("x", function(d,i){
          return x(d.day)
        })
        .attr("y", function(d){
          return y(d.hour)
        })
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("height", 20)
        .attr("width", 40)
        .style("stroke-width", 1)
        .style("stroke", "#403b3b")
        .style("fill", "none")
        .style("opacity", 1)        
      
      
    

    // //Draw Error Lines    
    // svg.selectAll('line')
    // .data(d)
    // .enter()
    // .append("line")
    //   .attr("class", "errorLine")
    //   .attr("x1", function(d){
    //       return x(d.day)+me(d.magError)
    //   })
    //   .attr("y1", function(d){
    //       return y(d.hour)
    //   })
    //   .attr("x2", function(d){
    //       return x(d.day)+me(d.magError)
    //   })
    //   .attr("y2", function(d){
    //       return y(d.hour)+de(d.depthError)
    //   })
    //   .style("stroke-width", 1.5)
    //   .style("stroke", "black")
    //   .style("opacity", 1)
    //   .on("mouseover", mouseover2)
    //   .on("mousemove", mousemove2)
    //   .on("mouseleave", mouseleave2)

    
    
// Add the errorLine title
svg.append("text")
	.attr("x", 0)             
	.attr("y", 0) 
	.attr("transform", "translate(1340,-7)")
	.attr("class", "legend")
	.style("fill", "Black")         
	.text("Hour");

svg.append("text")
	.attr("x", 0)             
	.attr("y", 0) 
	.attr("transform", "translate(30,-800)")
	.attr("class", "legend")
	.style("fill", "Black")         
	.text("Day");

    
    

})
   