<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
// $headers = apache_request_headers();

function json(array $array) {
    die(json_encode($array));
}

$path = dirname(__DIR__).DIRECTORY_SEPARATOR;

$images = array();
$dir = opendir($path);

while ($file = readdir($dir)) {
	if ($file != '.' && $file != '..' && !is_dir($path.$file)) {
		$images[] = "http://vps-f87b433e.vps.ovh.net/plants_images/$file";
	}
}

json(array(
	'error' => false,
	'images' => $images
));
// 83878c91171338902e0fe0fb97a8c47a

// Al mandarlo desde el cliente con FormData, funciona bien de esta manera. (_POST)