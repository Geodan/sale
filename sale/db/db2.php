<?php 
// Define the database info 
// -- Modify for your case -- 
define("DB_SERVER", "localhost"); 
define("DB_USER", "homedbuser3"); 
define("DB_PASS", "homedbuser"); 
define("DB_NAME", "geotemco"); 
define("DB_TABLE", "batij"); 

header("Content-type: application/xml"); 

printf("<?xml version=\"1.0\" encoding=\"UTF-8\"?> <kml xmlns=\"http://earth.google.com/kml/2.0\"> <Document>");

// You can include a default map view using the following lines 
	/* -- Delete this block if you don't need it -- 
printf("<LookAt> 
<latitude>42.390185</latitude> 
<longitude>-72.528412</longitude> 
<range>1200</range> 
<tilt>0</tilt> 
<heading>0</heading> 
</LookAt>");  */

if ($db = mysqli_connect(DB_SERVER, DB_USER, DB_PASS)) { 
mysqli_select_db($db, DB_NAME); 
$query = "SELECT * FROM batij" . DB_TABLE; 

// $query .= " ORDER BY name DESC";

// Finally query the database data 
$result = mysqli_query($db, $query); 

// Now iterate over all placemarks (rows) 
while ($row = mysqli_fetch_object($result)) {
// This writes out a placemark with some data 
// -- Modify for your case -- 
printf(' 
<Placemark id="ID"> 
<name>%s says:</name> 
<description>%s</description>
<Point> 
<coordinates>%f,%f</coordinates> 
</Point> 
</Placemark>',
 htmlspecialchars($row->ID), 
 htmlspecialchars($row->Name), 
 htmlspecialchars($row->Description), 
 htmlspecialchars($row->Lon), 
 htmlspecialchars($row->Lat) 
 ); 
 }; 
 
  // Close the database connection 
  mysqli_close($db); 
  }; 
  // And finish the document 
  printf(" 
  </Document> 
  </kml>"); 
  ?> 