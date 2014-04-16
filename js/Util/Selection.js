
function Selection(objects, widget) {

	this.objects = objects;
	if ( typeof objects == 'undefined') {
		this.objects = [];
		for (var i = 0; i < GeoTemConfig.datasets; i++) {
			this.objects.push([]);
		}
	}
	this.widget = widget;

	this.getObjects = function(widget) {
		if (!this.equal(widget)) {
			return this.objects;
		}
		this.objects = [];
		for (var i = 0; i < GeoTemConfig.datasets; i++) {
			this.objects.push([]);
		}
		return this.objects;
	};

	this.equal = function(widget) {
		if (this.valid() && this.widget != widget) {
			return false;
		}
		return true;
	};

	this.valid = function() {
		if ( typeof this.widget != 'undefined') {
			return true;
		}
		return false;
	};

};

