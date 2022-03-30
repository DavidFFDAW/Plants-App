<?php
require_once './functions.php';
require_once './Plant.php';
require_once './Search.php';

headersWithMethod('POST');

if (!isset($_POST['name']) || empty($_POST['name'])) {
      json(400,'No se ha enviado el nombre de la planta',true);      
      exit();
}

$search = $_POST['name'];

Search::incrementOrInsertSearch($search, date('Y-m-d H:i:s'));

$plants = Plant::findByName($search);

json(200, 'No errors', false, array('plants' => $plants) );
