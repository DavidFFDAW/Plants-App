<?php

require_once './functions.php';

headersWithMethod('GET');

$path = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR;

$images = array();
$dir = opendir($path);

$includes = array('jpg', 'jpeg', 'png');

while ($file = readdir($dir)) {
	if ($file != '.' && $file != '..' && !is_dir($path . $file)) {
		$ext = pathinfo($file, PATHINFO_EXTENSION);
		if (in_array($ext, $includes)) {
			$images[] = "http://vps-f87b433e.vps.ovh.net/plants/images/$file";
		}
	}
}

json(200, 'Se recibieron las plantas de forma correcta', false, array('images' => $images));
