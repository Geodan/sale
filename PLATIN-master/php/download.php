<?php
/*
* proxy.php
*
* Copyright (c) 2013, Sebastian Kruse. All rights reserved.
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
 
if (!empty($_POST['file'])) {
	
	$file = $_POST['file'];
	$filesize = strlen($file);
	
	$mime = array('application/octet-stream');
	
	header('Content-Type: '.$mime);
	header('Content-Disposition: attachment; filename="test.kml"');
	header('Content-Transfer-Encoding: binary');
	header('Content-Length: '.sprintf('%d', $filesize));
	header('Expires: 0');
	
	// check for IE only headers
	// credits to: cballou, http://stackoverflow.com/questions/2019964/php-form-download-to-zip
	if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
	  header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	  header('Pragma: public');
	} else {
	  header('Pragma: no-cache');
	}
	
	echo $file;
}
?>