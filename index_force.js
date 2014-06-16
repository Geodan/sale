
<html>
	<head>
		<meta charset="utf-8">
		<title>Sailing Networks</title>
		<script src="http://d3js.org/d3.v3.js"></script>
		<!-- <link rel="stylesheet" type="text/css" href="css/style.css"> -->
	</head>
<style> 

path.link {
	fill: none;
	stroke: #666;	
	stroke-width: 1.5px;
}

circle {
	fill: #ccc;	
	stroke: #fff;
	stroke-width: 1.5px;
}

text { 
	fill: #000;
	font: 10px sans-serif;
	pointer-events: none;
}

</style>
<body>


<script>
//Code geschreven door Mark Opmeer t.b.v. Sailing Networks Project 2013-2014 UVA, VU, GEODAN
//laden netwerk bestand
d3.json("nederlandsebrieven.json", function(error,links) { 

var nodes = {}; 

//doorzoeken d bestand; verbindingen leggen tussen nodes.
links.forEach(function(link) {
	link.source = nodes[link.source] ||
		(nodes[link.source] = {name: link.source});
	link.target = nodes[link.target] ||
		(nodes[link.target] = {name: link.target});
	//link.datum_verzonden = nodes[link.datum_verzonden] ||
	//	(nodes[link.datum_verzonden] = {name: link.datum_verzonden});
	//link.value = +link.value;
});

	//omvang SVG
var width = 1920,
	height = 1080,
	color = d3.scale.category20c();

var force = d3.layout.force()
	.nodes(d3.values(nodes)) //layout nodes
	.links(links) //layout links
	.size([width, height]) //omvang layout 
	.linkDistance(340) //afstand tussen linked nodes
	.charge(-1300) //force tussen nodes -=repulsion +=attraction
	.on("tick",tick) //force layout animatie, één stap. (verantwoordelijk voor vloeiende beweging)
	.start(); //start de simulatie
	
//instellen svg container
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);
	
//pijl
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      
  .enter().append("svg:marker")    
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

//links en pijlen toevoegen. Gebruikt hiervoor de #end marker
var path = svg.append("svg:g").selectAll("path")
	.data(force.links())
	.enter().append("svg:path")
	.attr("class","link")
	.attr("marker-end","url(#end)");
	
//nodes
var node = svg.selectAll(".node")
	.data(force.nodes())
	.enter().append("g")
	.attr("class","node")
	.on ("click",click) //node highlight
	.on ("dblclick", dblclick) //node highlight 2
	.call(force.drag); // hiermee kan je de nodes verslepen met de muis.
	
//toevoegen van nodes aan svg-cirkel	
node.append("circle")
	.attr("r", 5);

//text toevoegen/namen van de nodes
node.append("text")
	.attr("x",12)
	.attr("dy",".35em")
	.text(function(d) { return d.name; });

//curvy lijntjes toevoegen en updaten van grafiek.
function tick(){ 
	path.attr("d", function(d){ 
		var dx = d.target.x - d.source.x,
			dy = d.target.y - d.source.y,
			dr = Math.sqrt(dx * dx + dy * dy);
		return "M" +
			d.source.x + "," + 
			d.source.y + "A" + 
			dr + "," + dr + " 0 0,1 " +
			d.target.x + "," +
			d.target.y;
	});
		
	node
		.attr("transform", function(d) { 
		return "translate(" + d.x + "," + d.y+ ")";});
}

function click(){ //declare functie click
	d3.select(this).select("text").transition()
		.duration(750)
		.attr("x",22)
		.style("fill","steelblue")
		.style("stroke", "lightsteelblue")
		.style("stroke-width",".5px")
		.style("font","20px sans-serif");
	d3.select(this).select("circle").transition()
		.duration(750) 
		.attr("r",16)
		.style("fill","lightsteelblue");
}

function dblclick(){ //declare functie dubbelklik
	d3.select(this).select("circle").transition()
		.duration(750)
		.attr("r",6)
		.style("fill","#ccc");
	d3.select(this).select("text").transition()
		.duration(750)
		.attr("x",12)
		.style("stroke","none")
		.style("fill","black")
		.style("stroke","none")
		.style("font","10px sans-serif");
}
	
});
	
</script>
</body> 
</html>
	
	