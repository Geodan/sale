/*
* FilterBar.js
*
* Copyright (c) 2012, Stefan Jänicke. All rights reserved.
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 3 of the License, or (at your option) any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this library; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
* MA 02110-1301  USA
*/

/**
 * @class FilterBar
 * Implementation for FilterBar Object
 * @author Stefan Jänicke (stjaenicke@informatik.uni-leipzig.de)
 * @release 1.0
 * @release date: 2012-07-27
 * @version date: 2012-07-27
 *
 * @param {Object} parent parent to call filter functions
 * @param {HTML object} parentDiv div to append filter buttons
 */
function FilterBar(parent, parentDiv) {

	var bar = this;

	this.filter = document.createElement('div');
	this.filter.setAttribute('class', 'smallButton filterDisabled');
    this.filter.setAttribute('title', 'Create a selection and use this button to show only this selection');
	this.filter.onclick = function() {
		parent.filtering();
	};

	this.filterInverse = document.createElement('div');
	this.filterInverse.setAttribute('class', 'smallButton filterInverseDisabled');
    this.filterInverse.setAttribute('title', 'Create a selection and use this button to show only the current items outside this selection');
	this.filterInverse.onclick = function() {
		parent.inverseFiltering();
	};
	if (!GeoTemConfig.inverseFilter) {
		this.filterInverse.style.display = 'none';
	}

	this.cancelSelection = document.createElement('div');
	this.cancelSelection.setAttribute('class', 'smallButton filterCancel');
    
	this.cancelSelection.setAttribute('title', 'Remove all filters and show the original datasets');
    this.cancelSelection.onclick = function() {
		parent.core.reset();
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
            this.filter.setAttribute('title', 'Show only the selection');
			this.filterInverse.setAttribute('class', 'smallButton filterInverse');
            this.filterInverse.setAttribute('title', 'Show only the current items outside the selection');
			
		} else {
			this.filter.setAttribute('class', 'smallButton filterDisabled');
            this.filter.setAttribute('title', 'Create a selection and use this button to show only this selection');
			this.filterInverse.setAttribute('class', 'smallButton filterInverseDisabled');
			this.filterInverse.setAttribute('title', 'Create a selection and use this button to show only the current items outside this selection');
		}
	};

};
