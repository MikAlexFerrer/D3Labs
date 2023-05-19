var svg = d3.select("#chart-area").append("svg")
	.attr("width", 1200)
	.attr("height", 1200);

d3.json("/data/buildings.json").then((data) => {
	console.log(data);

	var heights = []

	for (let i = 0; i < data.length; i++)
	{
		heights.push(data[i].height);
	}

	for (let i = 0; i < heights.length; i++)
	{
		var rect = svg.append("rect")
		.attr("x", 40*i)
		.attr("y", 20)
		.attr("width", 20)
		.attr("height", heights[i])
		.attr("fill","green");
	}

}).catch((error)=> {
	console.log(error);
});