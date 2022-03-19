<?php

require_once './functions.php';
require_once './Plant.php';

headersWithMethod('POST');

if (!isset($_GET['id']) || empty($_GET['id']) || !is_numeric((int) $_GET['id'])) {
    json(400, 'No se ha enviado el id de la planta', true);
}

// $dbg = array(
//     'get' => $_GET,
//     'post' => $_POST,
//     'plant' => Plant::find((int) $_GET['id']),
// );

validateHeaderToken();

$plant = Plant::find((int) $_GET['id'], true);

// $assocArray = $plant->toArray();
// debugInsomnia(implode(' = ?, ',array_keys($assocArray)).' = ?');


$plant->setName(existsNotEmpty($_POST['name'], $plant->getName()));
$plant->setRealName(existsNotEmpty($_POST['real_name'], $plant->getRealName()));

$plant->setDescription(existsNotEmpty($_POST['description'], $plant->getDescription()));
$plant->setLocation(existsNotEmpty($_POST['location'], $plant->getLocation()));
$plant->setExtraLocation(existsNotEmpty($_POST['extra_location'], $plant->getExtraLocation()));
$plant->setType(existsNotEmpty($_POST['type'], $plant->getType()));
$plant->setQuantity(existsNotEmpty((int) $_POST['quantity'], $plant->getQuantity()));
$plant->setWaterQuantity(existsNotEmpty((int) $_POST['water_quantity'], $plant->getWaterQuantity()));

// debugInsomnia($plant->toArray());

$ext = '.jpg';
$imageIsUploaded = false;
$imagesDirPath = dirname(__DIR__).DIRECTORY_SEPARATOR.'images'.DIRECTORY_SEPARATOR;
$asdadfasd = 'http://vps-f87b433e.vps.ovh.net/plants/images/';
$previousImageName = str_replace($asdadfasd, '', $plant->getImage());

$finalImageURL = '';
$imageName = str_replace(' ', '_', $_POST['name']);
$finalFilename = date('Y-m-d').'_'.$imageName.'.jpg';

$previousImageFile = $imagesDirPath.$previousImageName;
if (!isset($previousImageName) || empty($previousImageName) || !file_exists($previousImageFile)) {
    
    if (isset($_FILES['file'])) {
        $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $finalFilename = date('Y-m-d').'_'.$imageName.'.'.$ext;
        if(file_exists($previousImageFile)) unlink($previousImageFile);
        $imageIsUploaded = move_uploaded_file($_FILES['file']['tmp_name'], $imagesDirPath . $finalFilename);
        $finalImageURL = 'http://vps-f87b433e.vps.ovh.net/plants/images/'.$finalFilename;

        $plant->setImage(file_exists($imagesDirPath.$finalFilename) ? $finalImageURL : '');
    }
}

if (!$plant->update()) {
      json(500,'Error en la actualizacion de la planta',true, array(
          'received_data' => $plant->toArray()
      ));
}

json(201,'Planta actualizada correctamente',false);
