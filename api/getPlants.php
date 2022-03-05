<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once './Plant.php';

function json(array $array) {
    die(json_encode($array));
}

$plants = Plant::findAll();


if (empty($plants)) {
    json(array(
        'error' => true,
        'message' => 'No hay plantas',
        'code' => 404
    ));
}

json(array(
	    'error' => false,
        'message' => 'Se recibieron las plantas de forma correcta',
        'code' => 200,
        'plants' => $plants
));