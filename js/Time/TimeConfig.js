
  
function TimeConfig(options) {

	this.options = {
		timeTitle : 'GeoTemCo Time View', // title will be shown in timeplot header
		timeIndex : 0, // index = position in date array; for multiple dates the 2nd timeplot refers to index 1
		timeWidth : false, // false or desired width css definition for the timeplot
		timeHeight : '100px', // false or desired height css definition for the timeplot
		defaultMinDate : new Date(1670, 0, 1), // required, when empty timelines are possible
		defaultMaxDate : new Date(), // required, when empty timelines are possible
		timeCanvasFrom : '#EEE', // time widget background gradient color top
		timeCanvasTo : '#EEE', // time widget background gradient color bottom
		rangeBoxColor : "white", // fill color for time range box
		rangeBorder : "1px solid #de7708", // border of frames
		dataInformation : true, // show/hide data information
		rangeAnimation : true, // show/hide animation buttons
		scaleSelection : true, // show/hide scale selection buttons
		linearScale : true, // true for linear value scaling, false for logarithmic
		unitSelection : true, // show/hide time unit selection dropdown
		timeUnit : -1, // minimum temporal unit (SimileAjax.DateTime or -1 if none) of the data
		timeMerge : false // if the elements of distinct datasets should be merged into one set or not
	};
	if ( typeof options != 'undefined') {
		$.extend(this.options, options);
	}

};
