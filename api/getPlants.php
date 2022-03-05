<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once './functions.php';
require_once './Plant.php';

$plants = Plant::findAll();

if (!isset($plants) || empty($plants)) {
    json(404, 'No se encontraron plantas', true);
}

json(200, 'Se recibieron las plantas de forma correcta', false, array('plants' => $plants));
