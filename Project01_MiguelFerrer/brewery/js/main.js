d3.json("/data/revenues.json").then((data) => {
	console.log(data);

	var margin = {top: 10, right: 10, bottom: 100, left:100};
	var width = 600 - margin.left - margin.right;
	var height = 400 - margin.top - margin.bottom;

	var g = d3.select("#chart-area")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
        .style("fill","black")
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

	var x = d3.scaleBand()
	.domain(data.map(function(d) { return d.month; }))
	.range([0, height])
	.paddingInner(0.3)
	.paddingOuter(0.3);

	var y = d3.scaleLinear()
	.domain([0, 60000])
	.range([height, 0]);

	g.append("text")
		.attr("class", "x axis-label")
		.attr("x", (width/4))
		.attr("y", height+60)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.style("fill","black")
		.text("Month");

	g.append("text")
		.attr("class", "y axis-label")
		.attr("x", - (height / 2))
		.attr("y", -60)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill","black")
		.text("Revenue (dlls.)");

	var bottomAxis = d3.axisBottom(x);
	g.append("g")
		.attr("class", "bottom axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(bottomAxis)
	.selectAll("text")
		.attr("y", "10")
		.attr("x", "-5")
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-40)");

	var leftAxis = d3.axisLeft(y).ticks(5);
	g.append("g")
		.attr("class", "left axis")
		.call(leftAxis);

	var rects = g.selectAll("rect").data(data);

	rects.enter()
		.append("rect")
			.attr("x", (d) => { return x(d.month); })
			.attr("y", (d) => { return y(d.revenue); })
			.attr("width", x.bandwidth)
			.attr("height", (d) => { return height - y(d.revenue); })
			.attr("fill", "#CCCC00");
	

}).catch((error)=> {
	console.log(error);
});