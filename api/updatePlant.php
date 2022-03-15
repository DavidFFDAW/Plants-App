<?php

require_once './functions.php';
require_once './Plant.php';

headersWithMethod('POST');

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric((int) $_GET['id'])) {
    json(400, 'No se ha enviado el id de la planta', true);
}

validateHeaderToken();

$plant = Plant::find((int) $_GET['id'], true);

$ext = '.jpg';
$imageIsUploaded = false;
$imagesDirPath = dirname(__DIR__).DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR;
$asdadfasd = 'http://vps-f87b433e.vps.ovh.net/plants/images/';
$previousImageName = str_replace($asdadfasd, '', $_POST['image']);

$finalImageURL = '';
$imageName = str_replace(' ', '_', $_POST['name']);
$finalFilename = date('Y-m-d').'_'.$imageName.'.jpg';

if (!file_exists($imagesDirPath.$previousImageName)) {
    if (isset($_FILES['file'])) {
        $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $finalFilename = date('Y-m-d').'_'.$imageName.'.'.$ext;
        $imageIsUploaded = move_uploaded_file($_FILES['file']['tmp_name'], $imagesDirPath . $finalFilename);
        $finalImageURL = 'http://vps-f87b433e.vps.ovh.net/plants/images/'.$finalFilename;
        $plant->setImage(file_exists($imagesDirPath.$finalFilename) ? $finalImageURL : '');
    }
}

$createdAt = (isset($_POST['created_at']) && !empty($_POST['created_at'])) ? $_POST['created_at'] : date('Y-m-d H:i:s');
$extraLocation = (isset($_POST['extra_location']) && !empty($_POST['extra_location'])) ? $_POST['extra_location'] : '';
// $lastWatered = 

$plant->setName($_POST['name']);
$plant->setRealName($_POST['real_name']);
$plant->setDescription($_POST['description']);
$plant->setLocation($_POST['location']);
$plant->setExtraLocation($extraLocation);
$plant->setType($_POST['type']);
$plant->setQuantity((int) $_POST['quantity']);
$plant->setWaterQuantity((int) $_POST['water_quantity']);
$plant->setCreatedAt($createdAt);
// $plant->setLastTimeWatered(null);

if (!$plant->update()) {
      json(500,'Error en la actualizacion de la planta',true, array(
          'received_data' => $plant
      ));
}

json(201,'Planta actualizada correctamente',false);
