<?php

require_once './functions.php';
require_once './User.php';

headersWithMethod('POST');

if (!isset($_POST['email']) || empty($_POST['email'])) {
    json(400,'No se ha recibido el email del usuario',true);      
    exit();
}

if (!isset($_POST['password']) || empty($_POST['password'])) {
    json(400,'No se ha recibido la contraseña del usuario', true);      
    exit();
}
$user = User::findByEmail($_POST['email'],false);

$hashWithPassword = hash('sha256', $_POST['password'].$user['salt']);

if (!$user) {
    json(404,'El usuario no existe',true);
}

if ($user['hash'] !== $hashWithPassword) {
    json(404,'La contraseña no es correcta',true);
}

json(200,'Recepcion correcta de token',false,array('token'=> $user['token']));
