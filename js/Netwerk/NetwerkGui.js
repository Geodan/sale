function NetwerkGui(netwerk, div, options) {

	this.netwerkContainer = div;
	this.netwerkContainer.style.position = 'relative';

	this.tabs = document.createElement('div');
	this.tabs.setAttribute('class', 'netwerkTabs');
	div.appendChild(this.tabs);

	this.input = document.createElement('div');
	this.input.setAttribute('class', 'netwerkInput');
	div.appendChild(this.input);
};
