var data = [25, 20, 15, 10, 5];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

var rectangles = svg.selectAll("circle")
    .data(data);

for (let i = 0; i < data.length; i++)
{
	rectangles.enter()
		.append("circle")
			.attr("x", (d, i) => {
				return (i * 50) + 25;
			})
			.attr("y", 40)
			.attr("width", 40)
			.attr("height", (d)=> {return d;})
			.attr("fill", "green");
}

