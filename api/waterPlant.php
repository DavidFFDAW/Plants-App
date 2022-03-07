<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

require_once './functions.php';
require_once './Plant.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json(400,'La peticion debe ser POST',true);      
    exit();
}

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric((int) $_GET['id'])) {
    json(400,'El parametro de ID es incorrecto',true);      
    exit();
}

$plant = Plant::find((int) $_GET['id'], true);

if (!isset($plant) || empty($plant)) {
    json(404, 'No se encontró la planta solicitada', true);
}

$now = date('Y-m-d H:i:s');
$plant->setLastTimeWatered($now);
$isUpdated = $plant->update();

if (!$isUpdated) {
    json(500, 'Ocurrió un error actualizando la planta', true);
}

json(200, 'Se ha actualizado la planta forma correcta', false, array('watered' => $plant->getLastTimeWatered()));
