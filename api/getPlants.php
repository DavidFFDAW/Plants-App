<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once './functions.php';
require_once './Plant.php';

if (isset($_GET['id']) && !empty($_GET['id']) && is_numeric((int) $_GET['id'])) {
    $plant = Plant::find((int) $_GET['id']);
    json(200,'Planta recibida',false, array('plant' => $plant));      
    exit();
}

function daysAgoWatered($lastTimeWatered) {
    if (!isset($lastTimeWatered) || $lastTimeWatered == null) return false;
    
    $now = new DateTime('NOW');
    $lastWatered = new DateTime($lastTimeWatered);

    return $now->diff($lastWatered)->d;
}

$plants = Plant::findAll();

foreach ($plants as $item) {
    $item['watered_days_ago'] = daysAgoWatered($item);
}

if (!isset($plants) || empty($plants)) {
    json(404, 'No se encontraron plantas', true);
}

json(200, 'Se recibieron las plantas de forma correcta', false, array('plants' => $plants));
