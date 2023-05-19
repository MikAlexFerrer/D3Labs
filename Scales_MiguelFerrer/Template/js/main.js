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
		.attr("width", 20)
		.attr("height", heights[i])
	}

	var x = d3.scaleBand()
	.domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	.range([0, 400])
	.paddingInner(0.3)
	.paddingOuter(0.3);

	var y = d3.scaleLinear()
	.domain([0, 828])
	.range([0, 400]);

	var color = d3.scaleOrdinal()
	.domain([0, data.length])
	.range(["#13bcd7","#4d9e5e","#e8cdc4","#ec2f6d","#77341c","#e86716","#991ba7","#42d70a","#172fec","#2c4d50","#c28fe0"])

	d3.select("#chart-area")
	.selectAll('rect')
	.data(data)
	.attr('x', (d, i) => {
		return x(i);
	})
	.attr('y', (d, i) => {
		return y(i);
	})
	.attr('fill', (d, i) => {
		return color(i);
	})

}).catch((error)=> {
	console.log(error);
});