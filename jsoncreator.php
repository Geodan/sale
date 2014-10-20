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

$return_arr = array();

$fetch = mysql_query('SELECT * FROM networks WHERE landcode = 1 AND fuzzy = 1'); 

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['id'] = $row['idmeertens'];
	$row_array['source'] = $row['source'];
	$row_array['target'] = $row['target'];
    $row_array['name'] = $row['target'];
    $row_array['description'] = $row['genoemde_namen'];
	$row_array['location'] = [];
	$object1 = new StdClass();
	$object1->lon = $row['lng_ontvanger'];
	$object1 ->lat = $row['lat_ontvanger'];
	$object1 ->place = $row['bestemming_locatie'];
	$object2 = new StdClass();
	$object2 ->lon = $row['lng_zender']; 
	$object2 ->lat = $row['lat_zender']; 
	$object2 ->place = $row['verzendlocatie'];
	array_push($row_array['location'], $object1);
	array_push($row_array['location'], $object2);
	$row_array['time'] = $row['datum_verzonden'];
	$row_array['fuzzy'] = $row['fuzzy'];
	$row_array['tableContent'] = [$row['source'], $row['target'], $row['datum_verzonden'], $row['bestemming_locatie']] ;

    array_push($return_arr,$row_array);
}

echo json_encode($return_arr);
?>
