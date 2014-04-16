
function WidgetWrapper() {

	var wrapper = this;

	this.setWidget = function(widget) {
		this.widget = widget;
	}

	this.display = function(data) {
		if ( data instanceof Array) {
			GeoTemConfig.datasets = data.length;
			if ( typeof wrapper.widget != 'undefined') {
				this.widget.initWidget(data);
			}
		}
	};

	Publisher.Subscribe('highlight', this, function(data) {
		if (data == undefined) {
			return;
		}
		if ( typeof wrapper.widget != 'undefined') {
			wrapper.widget.highlightChanged(data);
		}
	});

	Publisher.Subscribe('selection', this, function(data) {
		if ( typeof wrapper.widget != 'undefined') {
			wrapper.widget.selectionChanged(data);
		}
	});

	Publisher.Subscribe('filterData', this, function(data) {
		wrapper.display(data);
	});

	Publisher.Subscribe('rise', this, function(id) {
		if ( typeof wrapper.widget != 'undefined' && typeof wrapper.widget.riseLayer != 'undefined') {
			wrapper.widget.riseLayer(id);
		}
	});

	Publisher.Subscribe('resizeWidget', this, function() {
		if ( typeof wrapper.widget != 'undefined' && typeof wrapper.widget.gui != 'undefined' && typeof wrapper.widget.gui.resize != 'undefined' ) {
			wrapper.widget.gui.resize();
		}
	});

	this.triggerRefining = function(datasets) {
		Publisher.Publish('filterData', datasets, null);
	};

	this.triggerSelection = function(selectedObjects) {
		Publisher.Publish('selection', selectedObjects, this);
	};

	this.triggerHighlight = function(highlightedObjects) {
		Publisher.Publish('highlight', highlightedObjects, this);
	};

	this.triggerRise = function(id) {
		Publisher.Publish('rise', id);
	};

};
