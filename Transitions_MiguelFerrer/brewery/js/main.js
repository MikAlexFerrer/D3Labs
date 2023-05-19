var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var flag = true;

var g = d3.select("#chart-area")
.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
.append("g")
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand().range([0, width]).padding(0.2);

var y = d3.scaleLinear().range([height, 0]);

g.append("text")
	.attr("class", "x axis-label")
	.attr("x", (width/2))
	.attr("y", height+60)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.style("fill","black")
	.text("Month");

var yLabel = g.append("text")
	.attr("class", "y axis-label")
	.attr("x", - (height / 2))
	.attr("y", -60)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")
	.style("fill","black")
	.text("Revenue");

var xAxisGroup = g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0, " + height + ")")

var xAxisCall = d3.axisBottom(x);

var yAxisGroup = g.append("g").attr("class", "y-axis");

var yAxisCall = d3.axisLeft(y).ticks(5);

d3.json("data/revenues.json").then((data)=> {
	data.forEach((d)=>{
		d.revenue = +d.revenue;
		d.profit= +d.profit;
	});
	
	d3.interval( ( ) => {
		var newData = flag ? data : data.slice(1);

		update(newData);

		flag = !flag;
	}, 1000);

function update(data) {
	var value = flag ? "revenue" : "profit";

	x.domain(data.map((d) => { return d.month; }));
	y.domain([0, d3.max(data, (d) => { return d[value] })])

	var label = flag ? "Revenue" : "Profit";
	yLabel.text(label);

	xAxisGroup.call(xAxisCall)
	yAxisGroup.call(yAxisCall);

	var bars = g.selectAll("rect").data(data);
	bars.exit().remove();
	bars.attr("x", (d) => { return x(d.month); })
		.attr("y", (d) => { return y(d[value]); })
		.attr("width", x.bandwidth)
		.attr("height",(d) => { return height - y(d[value])});

	bars.enter().append("rect")
		.attr("x", (d) => { return x(d.month); })
		.attr("y", (d) => { return y(d[value]); })
		.attr("width", x.bandwidth)
		.attr("height", (d) => { return height - y(d[value])})
		.attr("fill", "yellow");

}

}).catch((error)=> {
	console.log(error);

});