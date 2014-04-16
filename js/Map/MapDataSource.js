
function MapDataSource(olMap, options) {

	this.olMap = olMap;
	this.circleSets = [];
	this.binning = new Binning(olMap, options);

};

MapDataSource.prototype = {

	/**
	 * initializes the MapDataSource
	 * @param {MapObject[][]} mapObjects an array of map objects of different sets
	 */
	initialize : function(mapObjects) {

		if (mapObjects != this.mapObjects) {
			this.binning.reset();
			this.binning.setObjects(mapObjects);
		}
		this.mapObjects = mapObjects;

		var set = this.binning.getSet();
		this.circleSets = set.circleSets;
		this.binSets = set.binSets;
		this.hashMapping = set.hashMaps;

	},

	getObjectsByZoom : function() {
		var zoom = Math.floor(this.olMap.getZoom());
		if (this.circleSets.length < zoom) {
			return null;
		}
		return this.circleSets[zoom];
	},

	getAllObjects : function() {
		if (this.circleSets.length == 0) {
			return null;
		}
		return this.circleSets;
	},

	getAllBins : function() {
		if (this.binSets.length == 0) {
			return null;
		}
		return this.binSets;
	},

	clearOverlay : function() {
		var zoom = Math.floor(this.olMap.getZoom());
		var circles = this.circleSets[zoom];
		for (var i in circles ) {
			for (var j in circles[i] ) {
				circles[i][j].reset();
			}
		}
	},

	setOverlay : function(mapObjects) {
		var zoom = Math.floor(this.olMap.getZoom());
		for (var j in mapObjects ) {
			for (var k in mapObjects[j] ) {
				var o = mapObjects[j][k];
				if (o.isGeospatial) {
					this.hashMapping[zoom][j][o.index].overlay += o.weight;
				}
			}
		}
	},

	size : function() {
		if (this.circleSets.length == 0) {
			return 0;
		}
		return this.circleSets[0].length;
	},

	getCircle : function(index, id) {
		var zoom = Math.floor(this.olMap.getZoom());
		return this.hashMapping[zoom][index][id];
	}
};
