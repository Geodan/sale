function NetwerkWidget(core, div, options) {

	this.core = core;
	this.core.setWidget(this);
	
	this.netwerken = [];
	this.netwerkTabs = [];
	this.netwerkElements = [];
	this.netwerkHash = [];

	this.options = (new NetwerkConfig(options)).options;
	this.gui = new NetwerkGui(this, div, this.options);
	

}

NetwerkWidget.prototype = {

	initWidget : function(data) {
		this.datasets = data;
		$(this.gui.tabs).empty();
		$(this.gui.input).empty();

		this.activeNetwerk = undefined;
		this.netwerken = [];
		this.netwerkTabs = [];
		this.netwerkElements = [];
		this.netwerkHash = [];

		this.selection = new Selection();
		
		var netwerkWidget = this;
		var addTab = function(name, index) {
			var netwerkTab = document.createElement('div');
			netwerkTab.setAttribute('class', 'netwerkTab');
			netwerkTab.style.backgroundColor = netwerkWidget.options.unselectedCellColor;
			netwerkTab.onclick = function() {
				netwerkWidget.selectNetwerk(index);
			}
			netwerkTab.innerHTML = name;
			return netwerkTab;
		}

		for (var i in data ) {
			this.netwerkHash.push([]);
			var netwerkTab = addTab(data[i].label, i);
			this.gui.tabs.appendChild(netwerkTab);
			this.netwerkTabs.push(netwerkTab);
			var elements = [];
			for (var j in data[i].objects ) {
				elements.push(new NetwerkElement(data[i].objects[j]));
				this.netwerkHash[i][data[i].objects[j].index] = elements[elements.length - 1];
			}
			var netwerk = new Netwerk(elements, this, i);
			this.netwerken.push(netwerk);
			this.netwerkElements.push(elements);
		}

		if (data.length > 0) {
			this.selectNetwerk(0);
		}

	},

	getHeight : function() {
		if (this.options.netwerkHeight) {
			return this.gui.NetwerkContainer.offsetHeight;
		}
		return false;
	},

	selectNetwerk : function(index) {
		if (this.activeNetwerk != index) {
			if ( typeof this.activeNetwerk != 'undefined') {
				this.netwerken[this.activeNetwerk].hide();
				this.netwerkTabs[this.activeNetwerk].style.backgroundColor = this.options.unselectedCellColor;
			}
			this.activeNetwerk = index;
			this.netwerken[this.activeNetwerk].show();
			var c = GeoTemConfig.getColor(this.activeNetwerk);
			this.netwerkTabs[this.activeNetwerk].style.backgroundColor = 'rgb(' + c.r0 + ',' + c.g0 + ',' + c.b0 + ')';
			this.core.triggerRise(index);
		}

	},

	highlightChanged : function(objects) {
			console.log('highlight.changed')
	},

	selectionChanged : function(selection) {
		for (var i in selection.objects ) {
			
			var elements = [];
			for (var j in selection.objects[i] ) {
				elements.push(new NetwerkElement(selection.objects[i][j]));
				//this.netwerkHash[i][selection[i].objects[j].index] = elements[elements.length - 1];
			}
			this.netwerken[i].update(elements)
		}

	},

	triggerHighlight : function(item) {
		
	},

	filtering : function() {
		for (var i = 0; i < this.datasets.length; i++) {
			this.datasets[i].objects = this.selection.objects[i];
		}
		this.core.triggerRefining(this.datasets);
	},

	inverseFiltering : function() {
		var selectedObjects = [];
		for (var i = 0; i < GeoTemConfig.datasets; i++) {
			selectedObjects.push([]);
		}
		var valid = false;
		for (var i = 0; i < this.netwerkElements.length; i++) {
			for (var j = 0; j < this.netwerkElements[i].length; j++) {
				var e = this.netwerkElements[i][j];
				if (!e.selected) {
					selectedObjects[i].push(e.object);
					valid = true;
				}
			}
		}
		this.selection = new Selection();
		if (valid) {
			this.selection = new Selection(selectedObjects, this);
		}
		this.filtering();
	},

	triggerRefining : function() {
		this.core.triggerRefining(this.selection.objects);
	},

	reset : function() {
		if( this.netwerken.length > 0 ){
			this.netwerken[this.activeNetwerk].resetElements();
			this.netwerken[this.activeNetwerk].reset();
			this.netwerken[this.activeNetwerk].update();
		}
	}
}
