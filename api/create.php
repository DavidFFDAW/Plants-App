<?php

require_once './functions.php';
require_once './Plant.php';

headersWithMethod('POST');

if (!isset($_POST['name']) || empty($_POST['name'])) {
      json(400,'No se ha enviado el nombre de la planta',true);      
      exit();
}
if (!isset($_POST['real_name']) || empty($_POST['real_name'])) {
      json(400,'No se ha enviado el nombre cientifico de la planta',true);      
      exit();
}

validateHeaderToken();

$ext = '.jpg';
$imageIsUploaded = false;
$imagesDirPath = dirname(__DIR__).DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR;
// ...plants/images

if (!is_dir($imagesDirPath)) {
	mkdir($imagesDirPath);
}

$finalImageURL = '';
$imageName = str_replace(' ', '_', $_POST['name']);
$finalFilename = date('Y-m-d').'_'.$imageName.'.jpg';


if (isset($_FILES['file'])) {
      $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
      $finalFilename = date('Y-m-d').'_'.$imageName.'.'.$ext;
      $imageIsUploaded = move_uploaded_file($_FILES['file']['tmp_name'], $imagesDirPath . $finalFilename);
      $finalImageURL = 'http://vps-f87b433e.vps.ovh.net/plants/images/'.$finalFilename;
}

$createdAt = (isset($_POST['created_at']) && !empty($_POST['created_at'])) ? $_POST['created_at'] : date('Y-m-d H:i:s');
$extraLocation = (isset($_POST['extra_location']) && !empty($_POST['extra_location'])) ? $_POST['extra_location'] : '';

$plant = new Plant();
$plant->setName($_POST['name']);
$plant->setRealName($_POST['real_name']);
$plant->setCustomName($_POST['custom_name'] ?? '');
$plant->setDescription($_POST['description']);
$plant->setImage(file_exists($imagesDirPath.$finalFilename) ? $finalImageURL : '');
$plant->setLocation($_POST['location']);
$plant->setExtraLocation($extraLocation);
$plant->setType($_POST['type']);
$plant->setQuantity((int) $_POST['quantity']);
$plant->setWaterQuantity((int) $_POST['water_quantity']);
$plant->setCreatedAt($createdAt);
$plant->setLastTimeWatered(null);

if (!$plant->create()) {
      json(500,'Error en la creación de la planta',true);
}

json(201,'Planta creada correctamente',false);
