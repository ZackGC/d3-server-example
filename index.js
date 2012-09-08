require("jsdom");
var d3 = require("d3");
var _ = require("underscore");
var fs = require("fs");


var size = 200;

var body = d3.select("body").html("");

var svg = body.append("svg")
    .attr("width",size)
    .attr("height",size);

var data = _.range(20).map(function(t){
                               var x = Math.cos(2*Math.PI*t/20);
                               var y = Math.sin(2*Math.PI*t/20);
                               return [x,y];
                           });

var x = d3.scale.linear().domain([-1.2,1.2]).range([0,size]);
var y = d3.scale.linear().domain([-1.2,1.2]).range([size,0]);
var color = d3.scale.category20();

svg.selectAll("circle").data(data).enter()
    .append("circle")
    .attr({
              cx: function(d){
                  return x(d[0]);
              },
              cy:function(d){
                  return y(d[1]);                  
              },
              r: function(d,i){
                  return i;
              },
              fill: function(d,i){
                  return color(i);
              }
          });


var svgHTML = body.html();
fs.writeFileSync("output.html",svgHTML);


//Still thinking about how to render an svg to a canvas
//There are modules that can do this
//But I haven't gotten any of them to work yet. 
var newBody = d3.select("body").html("");
var canvas = newBody.append("canvas")
    .attr({
              width: size,
              height: size
          });

