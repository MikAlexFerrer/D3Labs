var margin ={top: 20, right: 300, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    

var svg = d3.select("#chart-area").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + 
    	"," + margin.top + ")");

// Time parser for x-scale
var parseDate = d3.timeParse('%Y');
var formatSi = d3.format(".3s");
var formatNumber = d3.format(".1f"),
formatBillion = (x) => { return formatNumber(x / 1e9); };

// Scales
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);
var color = d3.scaleOrdinal(d3.schemeSpectral[11]);

// Axis generators
var xAxisCall = d3.axisBottom();
var yAxisCall = d3.axisLeft().tickFormat(formatBillion);

var area = d3.area()
    .x( (d) => { return x(d.data.date); })
    .y0((d) => { return y(d[0]); })
    .y1((d) => { return y(d[1]); });

// TODO: create the stack
var stack = d3.stack();

// Axis groups
var xAxis = g.append("g")
	.attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");
var yAxis =  g.append("g")
	.attr("class", "y axis");
        
// Y-Axis label
yAxis.append("text")
	.attr("class", "axis-title")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Billions of liters");

// Legend code
var legend = g.append("g")
    .attr("transform", "translate(" + (width + 150) + 
        "," + (height - 210) + ")");

d3.csv('data/stacked_area2.csv').then((data) => {

    color.domain(d3.keys(data[0]).filter((key) => { 
        return key !== 'date'; 
    }));

    countries = ["Belgium", "Canada", "Dominican Republic", "Germany", "Ireland", "Italy", "Mexico", "Netherlands", "Poland", "Rest of the world", "United Kingdom"]
        
    console.log(data[0].date)
    //TODO: obtain the keys array, remember to remove the first column
    var keys = data.columns.filter((key) => { return key !== 'date'; });

    stack.keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

	data.forEach((d) => {
	    d.date = parseDate(d.date);
	}); 

    var maxDateVal = d3.max(data, (d) => {
        var vals = d3.keys(d).map((key) => { 
            return key !== 'date' ? d[key] : 0 
        });
        return d3.sum(vals);
    });

    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain([0, maxDateVal]);

    // Generate axes once scales have been set
    xAxis.call(xAxisCall.scale(x))
    yAxis.call(yAxisCall.scale(y))

    stack.keys(keys)
        .order(d3.stackOrderNone)
	    .offset(d3.stackOffsetNone);

    // TODO: call the area generator with the appropriate data
    var browser = g.selectAll('.browser')
        .data(stack(data))
        .enter().append('g')
        .attr('class', (d) => { return 'browser ' + d.key; })
        .attr('fill-opacity', 0.5);

    browser.append('path')
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', (d) => { return color(d.key); });

    // Create legend
    countries.forEach((country, i) => {
        var legendRow = g.append("g")
        .attr("transform", "translate("+(width + 150)+", " + (height - 20 - (i*20)) + ")");
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", color(country));
        legendRow.append("text")
            .attr("x", -10)
            .attr("y", 10)
            .attr("text-anchor", "end")
            .style("text-transform", "capitalize")
            .text(country);
    });
    
    
}).catch((error) => {
    console.log(error);
});