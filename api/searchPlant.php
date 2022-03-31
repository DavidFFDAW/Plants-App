<?php
require_once './functions.php';
require_once './Plant.php';
require_once './Search.php';


if (getRequestMethod() == 'GET') {
      headersWithMethod('GET');

      $searches = Search::findAll(false);

      json(200, 'Here are all searches been made so far', false, array('searches' => $searches));
}

if (getRequestMethod() == 'POST') {

      headersWithMethod('POST');
      
      if (!isset($_POST['name']) || empty($_POST['name'])) {
            json(400,'No se ha enviado el nombre de la planta',true);      
            exit();
      }

      $search = (string) $_POST['name'];

      Search::incrementOrInsertSearch($search, date('Y-m-d H:i:s'));

      $plants = Plant::findByName($search, false);

      json(200, 'No errors', false, array('plants' => $plants) );
}
