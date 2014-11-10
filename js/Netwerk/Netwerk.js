function Netwerk(elements, parent, id) {
    this.core = parent.core;
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
		var width = 1920,
		    height = 300,
		    links;
        var svgdiv = d3.select(layout.netwerkDiv).append("svg")
            .attr({
                "width": "100%",
                "height": "450px"
              });
              
        d3.select(layout.netwerkDiv).select('svg')
            .append('rect')
             .attr({
                "width": "100%",
                "height": "450px"
              })
            .attr("pointer-events", "all")            
            .call(d3.behavior.zoom().on("zoom", redraw))
            .style('fill','white');

    
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
            .attr("d", "M0,-5L10,0L0,5")
            .style("fill","#888a85");

        var vis = svgdiv
            .append('svg:g');

        layout.svg = vis;
       
	   		    
    	function redraw() {
            vis.attr("transform",
                "translate(" + d3.event.translate + ")"
                + " scale(" + d3.event.scale + ")");
        }	

		
		layout.force = d3.layout.force()
		    //.linkStrength(0.1)
   // .friction(0.9)
    .distance(160)
    .charge(-120)
    .gravity(.01)
    //.chargeDistance(2000)
    
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
		
		var nid =0;
		links.forEach(function(link) {
            link.id=link.object.index;
			link.source = nodes[link.object.sid] ||
				(nodes[link.object.sid] = {name: link.object.tableContent.verzender, id : link.object.sid});
			link.target = nodes[link.object.tid] ||
				(nodes[link.object.tid] = {name: link.object.tableContent.ontvanger, id : link.object.tid});
                    
		});
		layout.force
            .nodes(d3.values(nodes))
            .links(links)
            .on("tick", tick)
            .start();
		 
		// Update links.
		link = link.data(links, function(d) { 
        return d.id; 
        });

		link.exit().remove();

		link.enter()//.insert("line", ".node")
            .append("line")
            .attr("class", "link")
            .style('opacity',0.5)
            .attr("marker-end", "url(#end)");

		// Update nodes.
		node = node.data(d3.values(nodes), function(d) { return d.id; });

		node.exit().remove();
        
        var drag = layout.force.drag()
            .on("dragstart", dragstart);
    
		var nodeEnter = node.enter().append("g")
            .attr("class", "node")            
            .on('mouseover',nodeover)
            .on('mouseleave',nodeleave)
            .on('click',nodeclick)
            .on('dblclick',dblclick)
            .call(drag)
       

		nodeEnter.append("circle")
            .attr("r", function(d) { return  4.5; });

       
		nodeEnter.append("text")
            .attr("dy", "1.2em");
        
		node.select("text")
            .text(function(d) { return d.name; });

		node.select("circle")
            
            .attr("class",function(d){
            return d.name.toLowerCase()=="onbekend"?"onbekend":""
            });

        function nodeleave(d) {
          //  layout.core.triggerHighlight([]);
        }
		function nodeover(d) {
			var nodelinks = [];
			links.forEach(function(l){
				if(d.name == l.source.name|| d.name == l.target.name) {
                    l.highlighted = true;
					nodelinks.push(l.object)
				}
			})
			
         //   layout.core.triggerHighlight([nodelinks]);
		}
        function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}
        function nodeclick(d) {

        var nodelinks = [];
        links.forEach(function(l){
				if(d.sid == l.source.sid|| d.tid == l.target.tid) {
                    l.collapsed = true;
					nodelinks.push(l.object)
				}
			})
       if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
 // update();
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
		  link.attr("x1", function(d) { return d.source.x; })
		      .attr("y1", function(d) { return d.source.y; })
		      .attr("x2", function(d) { return d.target.x; })
		      .attr("y2", function(d) { return d.target.y; })
            /*  .attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
                return "M" + 
                    d.source.x + "," + 
                    d.source.y + "A" + 
                    dr + "," + dr + " 0 0,1 " + 
                    d.target.x + "," + 
                    d.target.y;
                });*/

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

function NetwerkElement(object) {
    this.id='';
	this.object = object;
	this.selected = false;
	this.highlighted = false;
	this.source={};
	this.target={};

}
