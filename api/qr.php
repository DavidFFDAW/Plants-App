<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
// $headers = apache_request_headers();

require_once './functions.php';

// http://vps-f87b433e.vps.ovh.net/plants/api/qr.php?id=1&url=/plant/name/:name
if (!isset($_GET['id']) || !isset($_GET['url'])) {
    json(400, 'No se ha recibido la informacion necesaria', true);
}

$imagesDir = dirname(__DIR__).DIRECTORY_SEPARATOR;
$qrLib = dirname(__FILE__).DIRECTORY_SEPARATOR.'phpqrcode'.DIRECTORY_SEPARATOR;

if (!is_dir($imagesDir.'/qrs')) {
    mkdir($imagesDir.'/qrs');
}

require_once $qrLib.'qrlib.php';

$qrName = 'plant'.$_GET['id'].'qr';
//              /plant/name/:id
$finalUrlToQR = 'vps-f87b433e.vps.ovh.net:8669'.$_GET['url'];
$finalQrGeneratedFileName = md5($qrName).'.png';
$finalQrGeneratedFilePath = $imagesDir.'/qrs/'.$finalQrGeneratedFileName;
$finalURL = 'http://vps-f87b433e.vps.ovh.net/plants/qrs/'.$finalQrGeneratedFileName;


if (!file_exists($imagesDir.'/qrs/'.$finalQrGeneratedFileName)) {
    QRcode::png($finalUrlToQR, $finalQrGeneratedFilePath);
    
    if (!file_exists($finalQrGeneratedFilePath)) {
        json(500, 'Error al generar el QR', true);
    }
    json(200, 'QR generado correctamente', false, array('qr' => $finalURL));
}

json(200, 'QR ya existente', false, array('qr' => $finalURL));
