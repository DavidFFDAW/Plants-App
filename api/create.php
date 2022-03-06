<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
// $headers = apache_request_headers();

require_once './functions.php';
require_once './Plant.php';

if (!isset($_POST['name']) || empty($_POST['name'])) {
      json(400,'No se han recibido los datos correctos',true);      
      exit();
}
// VALIDACION DEL TOKEN
// 83878c91171338902e0fe0fb97a8c47a
/* if (!isset($headers['Authorization']) || $headers['Authorization'] != md5('p')) {
	json(array(
		'error' => true,
		'message' => 'No hay un token valido para hacer la petición',
            'code' => 403	
	));
} */

$ext = '.jpg';
$imageIsUploaded = false;
$imagesDirPath = dirname(__DIR__).DIRECTORY_SEPARATOR;
$finalImageURL = '';
$imageName = str_replace(' ', '_', $_POST['name']);


if (isset($_FILES['file'])) {
      $f = fopen($imagesDirPath.date('Y-m-d').'_debug_image.log', 'w+');
      $debug = "Hay un archivo\n";     
      $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
      $debug .= "Extensión: ".$ext."\n";
      $finalFilename = date('Y-m-d').'_'.$imageName.'.'.$ext;
      $debug .= "Nombre final: ".$finalFilename."\n";
      $imageIsUploaded = move_uploaded_file($_FILES['file']['tmp_name'], $imagesDirPath . $finalFilename);
      $debug .= "Se ha subido el archivo: ".($imageIsUploaded ? 'SI' : 'NO')."\n";
      $finalImageURL = 'http://vps-f87b433e.vps.ovh.net/plants_images/'.$finalFilename;
      $debug .= "URL final: ".$finalImageURL."\n";
      fwrite($f, $debug);
      fclose($f);
}

$createdAt = (isset($_POST['created_at']) && !empty($_POST['created_at'])) ? $_POST['created_at'] : date('Y-m-d H:i:s');
$extraLocation = (isset($_POST['extra_location']) && !empty($_POST['extra_location'])) ? $_POST['extra_location'] : '';

$plant = new Plant();
$plant->setName($_POST['name']);
$plant->setRealName($_POST['real_name']);
$plant->setDescription($_POST['description']);
$plant->setImage($finalImageURL);
$plant->setLocation($_POST['location']);
$plant->setExtraLocation($extraLocation);
$plant->setType($_POST['type']);
$plant->setCreatedAt($createdAt);
$plant->setLastTimeWatered(null);

if (!$plant->create()) {
      json(500,'Error en la creación de la planta',true);
}

json(201,'Planta creada correctamente',false);