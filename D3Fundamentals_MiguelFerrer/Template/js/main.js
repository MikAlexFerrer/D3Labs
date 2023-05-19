var svg = d3.select("#chart-area").append("svg")
	.attr("width", 600)
	.attr("height", 600);

var circle = svg.append("circle")
	.attr("cx", 300)
	.attr("cy", 150)
	.attr("r", 70)
	.attr("fill", "blue");

var rect = svg.append("rect")
	.attr("x", 70)
	.attr("y", 140)
	.attr("width", 30)
	.attr("height", 40)
	.attr("fill","red");
