<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');

require_once './functions.php';
require_once './Plant.php';

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric((int) $_GET['id'])) {
    json(400,'La petición es incorrecta',true);      
    exit();
}

$plant = Plant::find((int) $_GET['id']);

if (!isset($plant) || !$plant) json(404,'Plant not found in DB',true);

$hasBeenRemoved = $plant->remove();

if (!$hasBeenRemoved) {
    json(500,'Hubo un problema intentando borrar esta planta');
}

json(200, 'Esta planta ha sido borrada correctamente', false);
