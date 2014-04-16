
 */
CircleObject = function(originX, originY, shiftX, shiftY, elements, radius, search, weight, fatherBin) {

	this.originX = originX;
	this.originY = originY;
	this.shiftX = shiftX;
	this.shiftY = shiftY;
	this.elements = elements;
	this.radius = radius;
	this.search = search;
	this.weight = weight;
	this.overlay = 0;
	this.smoothness = 0;
	this.fatherBin = fatherBin;

	this.feature
	this.olFeature
	this.percentage = 0;
	this.selected = false;

};

CircleObject.prototype = {

	/**
	 * sets the OpenLayers point feature for this point object
	 * @param {OpenLayers.Feature} pointFeature the point feature for this object
	 */
	setFeature : function(feature) {
		this.feature = feature;
	},

	/**
	 * sets the OpenLayers point feature for this point object to manage its selection status
	 * @param {OpenLayers.Feature} olPointFeature the overlay point feature for this object
	 */
	setOlFeature : function(olFeature) {
		this.olFeature = olFeature;
	},

	reset : function() {
		this.overlay = 0;
		this.smoothness = 0;
	},

	setSelection : function(s) {
		this.selected = s;
	},

	toggleSelection : function() {
		this.selected = !this.selected;
	}
};
