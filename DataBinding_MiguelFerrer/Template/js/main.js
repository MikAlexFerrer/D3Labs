var data = [25, 20, 15, 10, 5];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

var circles = svg.selectAll("circle")
    .data(data);

for (let i = 0; i < data.length; i++)
{
	circles.enter()
		.append("circle")
			.attr("cx", (d, i) => {
				return (i * 50) + 25;
			})
			.attr("cy", 250)
			.attr("r", (d)=> {return d;})
			.attr("fill", "green");
}

