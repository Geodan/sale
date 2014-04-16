
  
function MapControl(map, button, label, onActivate, onDeactivate) {

	var control = this;
	this.button = button;
	this.enabled = true;
	this.activated = false;
	this.label = label;

	if (this.button != null) {
		$(this.button).addClass(label + 'Deactivated');
		$(this.button).attr("title", GeoTemConfig.getString(GeoTemConfig.language, label));
		//vhz
		$(this.button).click(function() {
			control.checkStatus();
		});
	}

	this.checkStatus = function() {
		if (control.enabled) {
			if ( typeof map.activeControl != 'undefined') {
				if (control.activated) {
					control.deactivate();
				} else {
					map.activeControl.deactivate();
					control.activate();
				}
			} else {
				control.activate();
			}
		}
	};

	this.setButtonClass = function(removeClass, addClass) {
		if (this.button != null) {
			$(this.button).removeClass(label + removeClass);
			$(this.button).addClass(label + addClass);
			$(this.button).attr("title", GeoTemConfig.getString(GeoTemConfig.language, label));
		}
	};

	this.disable = function() {
		this.enabled = false;
		this.setButtonClass('Deactivated', 'Disabled');
	};

	this.enable = function() {
		this.enabled = true;
		this.setButtonClass('Disabled', 'Deactivated');
	};

	this.activate = function() {
		onActivate();
		this.activated = true;
		this.setButtonClass('Deactivated', 'Activated');
		map.activeControl = this;
	};

	this.deactivate = function() {
		onDeactivate();
		this.activated = false;
		this.setButtonClass('Activated', 'Deactivated');
		map.activeControl = undefined;
	};

};
