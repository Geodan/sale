
function TableGui(table, div, options) {

	this.tableContainer = div;
	if (options.tableWidth) {
		this.tableContainer.style.width = options.tableWidth;
	}
	if (options.tableHeight) {
		this.tableContainer.style.height = options.tableHeight;
	}
	this.tableContainer.style.position = 'relative';

	this.tabs = document.createElement('div');
	this.tabs.setAttribute('class', 'tableTabs');
	div.appendChild(this.tabs);

	this.input = document.createElement('div');
	this.input.setAttribute('class', 'tableInput');
	div.appendChild(this.input);

};
