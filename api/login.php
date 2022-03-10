<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, 
Content-Type, Accept, Access-Control-Request-Method, Authorization");
// $headers = apache_request_headers();

require_once './functions.php';

if (!isset($_POST['mail']) || empty($_POST['mail'])) {
    json(400,'No se ha recibido el email del usuario',true);      
    exit();
}

if (!isset($_POST['password']) || empty($_POST['password'])) {
    json(400,'No se ha recibido la contraseña del usuario', true);      
    exit();
}

$getUser = "SELECT email,`password`,token FROM users WHERE email = ?";
$stmt = $conn->prepare($getUser);
$stmt->bind_param('s', $_POST['mail']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    json(404,'El usuario no existe',true);
}

if ($user['password'] !== md5($_POST['password'])) {
    json(404,'La contraseña no es correcta',true);
}

json(200,'Recepcion correcta de token',false,array('token'=> $user['token']));
