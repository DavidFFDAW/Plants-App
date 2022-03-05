<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
// $headers = apache_request_headers();
ini_set('display_errors', 1);
error_reporting(E_ALL);

$p = dirname(__FILE__).DIRECTORY_SEPARATOR.'phpqrcode'.DIRECTORY_SEPARATOR;
require_once $p.'qrlib.php';

echo file_exists($p.'qrlib.php') ? 'Exists' : 'Not Exists';

$fil = md5('pepitaflore').'.png';
QRcode::png('http://146.59.159.40:8669/',dirname(__DIR__) . DIRECTORY_SEPARATOR.$fil);

echo '<img src="http://146.59.159.40/plants_images/'.$fil.'" />';