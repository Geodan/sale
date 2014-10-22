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
		
//TODO: set the width and height to something more sensible
		var width = 800,
		    height = 300,
		    links;
		
      
        
		 var svgdiv = d3.select(layout.netwerkDiv).append("svg")
      .attr({
        "width": "100%",
        "height": "300px"
      })
      .attr("viewBox", "0 0 " + width + " " + height )
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", redraw));

    
    svgdiv.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

             var vis = svgdiv
    .append('svg:g');

             layout.svg = vis;
       
	   		    
    		function redraw() {
  
  vis.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}	

		
		layout.force = d3.layout.force()
		    .linkDistance(80)
		    .charge(-120)
		    .gravity(.05)
		    .size([width, height]);
			this.update();


	},
	update : function(selection) {
		
		var layout = this;
		var link = layout.svg.selectAll(".link");
		var node = layout.svg.selectAll(".node");

		var nodes = {}; 
		var links;
		if(selection!== undefined) {
			links = selection;

			
			
			
		}
		else {
			links = layout.elements;
			
		} 
		var tid=0;
		var sid =0;
		links.forEach(function(link) {
			link.source = nodes[link.object.tableContent[0]] ||
				(nodes[link.object.tableContent[0]] = {name: link.object.tableContent[0], id : sid++});
			link.target = nodes[link.object.tableContent[1]] ||
				(nodes[link.object.tableContent[1]] = {name: link.object.tableContent[1], id : sid++});	
		});
		//var rechts =  d3.layout.tree().links(layout.nodes);
		layout.force
		  .nodes(d3.values(nodes))
		  .links(links)
		  .on("tick", tick)
		  .start();
		 
		// Update links.
		link = link.data(links, function(d) { return d.target.id; });

		link.exit().remove();

		link.enter()//.insert("line", ".node")
		.append("svg:path")
//    .attr("class", function(d) { return "link " + d.type; })
    .attr("class", "link")
    .attr("marker-end", "url(#end)");

		// Update nodes.
		node = node.data(d3.values(nodes), function(d) { return d.id; });

		node.exit().remove();

		var nodeEnter = node.enter().append("g")
		.attr("class", "node")
		.on('mouseover',nodeover)
        .on('mouseleave',nodeleave)
     //   .on('click',nodeclick)
		.call(layout.force.drag)
       

		nodeEnter.append("circle")
		.attr("r", function(d) { return  4.5; });

       
		nodeEnter.append("text")
		.attr("dy", ".35em");
        
        
		node.select("text")
		.text(function(d) { return d.name; });

		node.select("circle")
		.style("fill", '#ffeeee');

		
        function nodeleave(d) {
            links[0].core.triggerHighlight([]);
           
        }
		function nodeover(d) {
			var nodelinks = [];
			links.forEach(function(l){
				if(d.name == l.source.name|| d.name == l.target.name) {
                    l.highlighted = true;
					nodelinks.push(l.object)
				}
			})
			
            links[0].core.triggerHighlight([nodelinks]);
		}
        function nodeclick(d) {
		/*	var nodelinks = [];
			links.forEach(function(l){
				if(d.name == l.source.name|| d.name == l.target.name) {
					nodelinks.push(l.object)
				}
			})
			var i = 0;
            links[0].core.triggerSelection(new Selection([nodelinks]));*/
		}
		 function tick() {
		  link.attr("x1", function(d) { 
                    return d.source.x; })
		      .attr("y1", function(d) { return d.source.y; 
		      })
		      .attr("x2", function(d) { return d.target.x; })
		      .attr("y2", function(d) { return d.target.y; })
              .attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    })
              ;

		  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		}

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

function NetwerkElement(object,core) {

	this.object = object;
    this.core = core;
	this.selected = false;
	this.highlighted = false;
	this.source={};
	this.target={};

}
