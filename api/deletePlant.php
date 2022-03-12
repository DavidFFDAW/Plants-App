<?php

require_once './functions.php';
require_once './Plant.php';

headersWithMethod('DELETE');

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric((int) $_GET['id'])) {
    json(400,'La petición es incorrecta',true);      
    exit();
}

validateHeaderToken();

$plant = Plant::find((int) $_GET['id'], true);

if (!isset($plant) || !$plant) json(404,'Plant not found in DB',true);

$imagesDirPath = dirname(__DIR__).DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR;
$imageURL = $plant->getImage();
$imageFileName = str_replace($imageURL,'http://vps-f87b433e.vps.ovh.net/plants/images/','');

$hasBeenRemoved = $plant->remove();

if (file_exists($imagesDirPath.$imageFileName)) {
    unlink($imagesDirPath.$imageFileName)
};

if (!$hasBeenRemoved) {
    json(500,'Hubo un problema intentando borrar esta planta');
}

json(200, 'Esta planta ha sido borrada correctamente', false);
