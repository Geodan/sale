
  

var arrayIndex = function(array, obj) {
	if (Array.indexOf) {
		return array.indexOf(obj);
	}
	for (var i = 0; i < array.length; i++) {
		if (array[i] == obj) {
			return i;
		}
	}
	return -1;
}
var GeoTemCoMinifier_urlPrefix;
for (var i = 0; i < document.getElementsByTagName("script").length; i++) {
	var script = document.getElementsByTagName("script")[i];
	var index = script.src.indexOf("geotemco.js");
	if (index == -1) {
		index = script.src.indexOf("geotemco-min.js");
	}
	if (index != -1) {
		GeoTemCoMinifier_urlPrefix = script.src.substring(0, index);
		break;
	}
}
