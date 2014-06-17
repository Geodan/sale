<?php
 $username = 'homedbuser3';
 $password = 'homedbuser';
 $database = 'sailing networks';
 $server = 'localhost';

// Opens a connection to a MySQL server.
$connection = mysql_connect ($server, $username, $password);
if (!$connection)
{
  die('Not connected : ' . mysql_error());
}

// Sets the active MySQL database.
$db_selected = mysql_select_db($database, $connection);
if (!$db_selected)
{
  die ('Can\'t use db : ' . mysql_error());
}

 // Selects all the rows in the markers table.
 $query = 'SELECT * FROM networks WHERE source = "Jan van Ruijven"';
 $result = mysql_query($query);
 if (!$result)
 {
  die('Invalid query: ' . mysql_error());
 }

// Creates an array of strings to hold the lines of the KML file.
$kml = array('<?xml version="1.0" encoding="UTF-8"?>');
$kml[] = ' <kml>';
/*$kml[] = '<kml xmlns="http://earth.google.com/kml/2.1">';
$kml[] = ' <Document>';
$kml[] = ' <Style id="restaurantStyle">';
$kml[] = ' <IconStyle id="restuarantIcon">';
$kml[] = ' <Icon>';
$kml[] = ' <href>http://maps.google.com/mapfiles/kml/pal2/icon63.png</href>';
$kml[] = ' </Icon>';
$kml[] = ' </IconStyle>';
$kml[] = ' </Style>';
$kml[] = ' <Style id="barStyle">';
$kml[] = ' <IconStyle id="barIcon">';
$kml[] = ' <Icon>';
$kml[] = ' <href>http://maps.google.com/mapfiles/kml/pal2/icon27.png</href>';
$kml[] = ' </Icon>';
$kml[] = ' </IconStyle>';
$kml[] = ' </Style>'; */

// Iterates through the rows, printing a node for each row.
while ($row = @mysql_fetch_assoc($result))
{
  $kml[] = ' <Placemark>';
  $kml[] = ' <address>' . ($row['bestemming_locatie']) .'</address>';
  $kml[] = ' <description> Afzender: ' . ($row['source']) . '</description>';
  $kml[] = ' <name> Geadresseerde: ' . htmlentities($row['target']). '</name>';
  $kml[] = ' <Point>';
  $kml[] = ' <coordinates>' . $row['coordinates_geadresseerde'] . '</coordinates>';
  $kml[] = ' </Point>';
  $kml[] = ' <TimeStamp>';
  $kml[] = ' <when>' .$row['datum_verzonden'] .'</when>';
  $kml[] = ' </TimeStamp>';
  $kml[] = ' </Placemark>';
}

// End XML file
//$kml[] = ' </Document>';
$kml[] = '</kml>';
$kmlOutput = join("\n", $kml);
header('Content-type: application/vnd.google-earth.kml+xml');
echo $kmlOutput;
?>
