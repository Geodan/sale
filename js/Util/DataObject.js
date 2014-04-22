
function DataObject(name, description, locations, senderlocations,  /*SMO: add a receiving(MO: I think you mean: sender location? Receiving location = "locations") locations here*/ dates, weight, tableContent) {

	this.name = name;
	this.description = description;
	this.weight = weight;
	this.tableContent = tableContent;

	this.percentage = 0;
	this.setPercentage = function(percentage) {
		this.percentage = percentage;
	}

	//SMO: this needs to be extended/copied to allow for receiving (MO:sender?) locations
	this.locations = locations;	 

	this.isGeospatial = false;
	if (this.locations.length > 0) {
		this.isGeospatial = true;
	}


	this.placeDetails = [];
	for (var i = 0; i < this.locations.length; i++) {
		this.placeDetails.push(this.locations[i].place.split("/"));
	}

	this.getLatitude = function(locationId) {
		return this.locations[locationId].latitude;
	}

	this.getLongitude = function(locationId) {
		return this.locations[locationId].longitude;
	}

	this.getPlace = function(locationId, level) {
		if (level >= this.placeDetails[locationId].length) {
			return this.placeDetails[locationId][this.placeDetails[locationId].length - 1];
		}
		return this.placeDetails[locationId][level];
	}
	//SMO: 'till here
	//MO: senderlocations open
		this.senderlocations = senderlocations;	 

	this.isGeospatial = false;
	if (this.senderlocations.length > 0) {
		this.isGeospatial = true;
	}


	this.placeDetailssender = [];
	for (var i = 0; i < this.locations.length; i++) {
		this.placeDetails.push(this.locations[i].place.split("/"));
	}

	this.getLatitudesender = function(locationId) {
		return this.locations[locationId].latitude;
	}

	this.getLongitudesender = function(locationId) {
		return this.locations[locationId].longitude;
	}

	this.getPlacesender = function(locationId, level) {
		if (level >= this.placeDetails[locationId].length) {
			return this.placeDetails[locationId][this.placeDetails[locationId].length - 1];
		}
		return this.placeDetails[locationId][level];
	}
	//MO: senderlocations close. Do I have to rename the functions (between the brackets) aswell? E.g.: locationId --> locationIdsender ?

	this.dates = dates;
	this.isTemporal = false;
	if (this.dates.length > 0) {
		this.isTemporal = true;
	}

	this.getDate = function(dateId) {
		return this.dates[dateId].date;
	}

	this.getTimeGranularity = function(dateId) {
		return this.dates[dateId].granularity;
	}

	this.setIndex = function(index) {
		this.index = index;
	}

	this.getTimeString = function() {
		if (this.timeStart != this.timeEnd) {
			return (SimileAjax.DateTime.getTimeString(this.granularity, this.timeStart) + " - " + SimileAjax.DateTime.getTimeString(this.granularity, this.timeEnd));
		} else {
			return SimileAjax.DateTime.getTimeString(this.granularity, this.timeStart) + "";
		}
	};

};
