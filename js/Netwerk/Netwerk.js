function Netwerk(elements, parent, id) {

	this.elements = elements;
	this.showElementsLength = elements.length;
	this.parent = parent;
	this.id = id;
	this.options = parent.options;


	this.keyHeaderList = [];
	this.initialize();

}


Netwerk.prototype = {
	initLayout: function() {
		var layout = this;
		

		var width = 800,
		    height = 300,
		    links;

		var force = d3.layout.force()
		    .linkDistance(80)
		    .charge(-120)
		    .gravity(.05)
		    .size([width, height])
		    .on("tick", tick);

		var svg = d3.select(layout.netwerkDiv).append("svg")
		    .attr("width", width)
		    .attr("height", height);

		var link = svg.selectAll(".link"),
		    node = svg.selectAll(".node");
			update();

		function update(selection) {
			layout.nodes = {}; 
			if(selection!== undefined) {
				links= selection;
			}
			else {
				links = layout.elements;
				
			} 
			var tid=0;
			var sid =0;
			links.forEach(function(link) {
				link.source = layout.nodes[link.object.tableContent[0]] ||
					(layout.nodes[link.object.tableContent[0]] = {name: link.object.tableContent[0], id : sid++});
				link.target = layout.nodes[link.object.tableContent[1]] ||
					(layout.nodes[link.object.tableContent[1]] = {name: link.object.tableContent[1], id : sid++});	
			});
			//var rechts =  d3.layout.tree().links(layout.nodes);
			force
		      .nodes(d3.values(layout.nodes))
		      .links(links)
		      .start();
// Update links.
  link = link.data(links, function(d) { return d.target.id; });

  link.exit().remove();

  link.enter().insert("line", ".node")
      .attr("class", "link");

  // Update nodes.
  node = node.data(d3.values(layout.nodes), function(d) { return d.id; });

  node.exit().remove();

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .on("click", click)
      .call(force.drag);

  nodeEnter.append("circle")
      .attr("r", function(d) { return  4.5; });

  nodeEnter.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  node.select("circle")
      .style("fill", color);

		}
			function tick() {
			  link.attr("x1", function(d) { 
			  	return d.source.x; })
			      .attr("y1", function(d) { return d.source.y; 
			      })
			      .attr("x2", function(d) { return d.target.x; })
			      .attr("y2", function(d) { return d.target.y; });

			  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			}
	function color(d) {
	return "#fd8d3c"; // leaf node
	}

	// Toggle children on click.
	function click(d) {

	}
	function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}
/*	//links == array
	//doorzoeken d bestand; verbindingen leggen tussen nodes.
	this.elements.forEach(function(link) {
		link.source = layout.nodes[link.object.tableContent[0]] ||
			(layout.nodes[link.object.tableContent[0]] = {name: link.object.tableContent[0]});
		link.target = layout.nodes[link.object.tableContent[1]] ||
			(layout.nodes[link.object.tableContent[1]] = {name: link.object.tableContent[1]});	
	});
		//omvang SVG
var width = 800,
	height = 300,
	color = d3.scale.category20c();

var force = d3.layout.force()
	.nodes(d3.values(layout.nodes)) //layout nodes
	.links(this.elements) //layout links
	.size([width, height]) //omvang layout 
	.linkDistance(10) //afstand tussen linked nodes
	.charge(-100) //force tussen nodes -=repulsion +=attraction
	.on("tick",tick) //force layout animatie, één stap. (verantwoordelijk voor vloeiende beweging)
	.start(); //start de simulatie
	layout.force = force;
//instellen svg container
var svg = d3.select(layout.netwerkDiv).append("svg")
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
*/


	},
	update : function() {
	
	},

	show : function() {
	
		this.netwerkDiv.style.display = "block";
	},

	hide : function() {
		this.netwerkDiv.style.display = "none";
	},

	resetElements : function() {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].selected = false;
			this.elements[i].highlighted = false;
		}
	},

	reset : function() {
		this.showSelectedItems = false;
		this.showElementsLength = this.elements.length;
		this.showSelected.setAttribute('class', 'smallButton showSelected');
		this.updateIndices(this.resultsPerPage);
	},

	initialize : function() {

		this.netwerkDiv = document.createElement("div");
		this.netwerkDiv.setAttribute('class', 'singleNetwerk');
		this.parent.gui.input.appendChild(this.netwerkDiv);

		

		this.netwerkDiv.style.display = 'none';
		this.initLayout();
		this.update();

	}
}

function NetwerkElement(object) {

	this.object = object;
	this.selected = false;
	this.highlighted = false;
	this.source={};
	this.target={};

}
