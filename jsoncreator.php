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

$fetch = mysql_query('SELECT * FROM networks WHERE source = "Jan van Ruijven"'); 

while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    $row_array['id'] = $row['idmeertens'];
    $row_array['name'] = $row['target'];
    $row_array['description'] = $row['genoemde_namen'];
	$row_array['lon'] = $row['lng'];
	$row_array['lat'] = $row['lat'];
	$row_array['place'] = $row['bestemming_locatie'];
	$row_array['time'] = $row['datum_verzonden'];
	$row_array['tableContent'] = $row['genre'];

    array_push($return_arr,$row_array);
}

echo json_encode($return_arr);
?>
