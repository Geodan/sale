
function FilterBar(parent, parentDiv) {

	var bar = this;

	this.filter = document.createElement('div');
	this.filter.setAttribute('class', 'smallButton filterDisabled');
	this.filter.onclick = function() {
		parent.filtering();
	};

	this.filterInverse = document.createElement('div');
	this.filterInverse.setAttribute('class', 'smallButton filterInverseDisabled');
	this.filterInverse.onclick = function() {
		parent.inverseFiltering();
	};
	if (!GeoTemConfig.inverseFilter) {
		this.filterInverse.style.display = 'none';
	}

	this.cancelSelection = document.createElement('div');
	this.cancelSelection.setAttribute('class', 'smallButton filterCancelDisabled');
	this.cancelSelection.onclick = function() {
		parent.deselection();
	};

	this.appendTo = function(parentDiv) {
		parentDiv.appendChild(this.filter);
		parentDiv.appendChild(this.filterInverse);
		parentDiv.appendChild(this.cancelSelection);
	}
	if ( typeof parentDiv != 'undefined') {
		this.appendTo(parentDiv);
	}

	this.reset = function(show) {
		if (show) {
			this.filter.setAttribute('class', 'smallButton filter');
			this.filterInverse.setAttribute('class', 'smallButton filterInverse');
			this.cancelSelection.setAttribute('class', 'smallButton filterCancel');
		} else {
			this.filter.setAttribute('class', 'smallButton filterDisabled');
			this.filterInverse.setAttribute('class', 'smallButton filterInverseDisabled');
			this.cancelSelection.setAttribute('class', 'smallButton filterCancelDisabled');
		}
	};

};
