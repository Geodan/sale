
function TableConfig(options) {

	this.options = {
		tableWidth : false, // false or desired width css definition for the table
		tableHeight : false, // false or desired height css definition for the table
		validResultsPerPage : [10, 20, 50, 100], // valid number of elements per page
		initialResultsPerPage : 10, // initial number of elements per page
		tableSorting : false, // true, if sorting of columns should be possible
		tableContentOffset : 25, // maximum display number of characters in a table cell
		tableSelectPage : true, // selection of complete table pages
		tableSelectAll : false, // selection of complete tables
		tableShowSelected : true, // show selected objects only option
		unselectedCellColor : '#EEE' // color for an unselected row/tab
	};
	if ( typeof options != 'undefined') {
		$.extend(this.options, options);
	}

};
