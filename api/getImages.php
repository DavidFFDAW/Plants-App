<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
// $headers = apache_request_headers();

require_once './functions.php';

$path = dirname(__DIR__).DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR;

$images = array();
$dir = opendir($path);

while ($file = readdir($dir)) {
	if ($file != '.' && $file != '..' && !is_dir($path.$file)) {
		$images[] = "http://vps-f87b433e.vps.ovh.net/plants/images/$file";
	}
}

json(200, 'Se recibieron las plantas de forma correcta', false, array('images' => $images));
