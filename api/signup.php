<?php

require_once './functions.php';
require_once './User.php';

headersWithMethod('POST');

function getRandomBytes(int $size) {
    return bin2hex(openssl_random_pseudo_bytes($size));
}

if (!isset($_POST['username']) || !isset($_POST['email']) || !isset($_POST['password'])) {
    json(400, 'Missing parameters', true);
    exit;
}
$salt = getRandomBytes(16);
$hash = hash('sha256', $_POST['password'] . $salt);

$tmp = getRandomBytes(8);
$token_tmp = $tmp.$hash;
$token = md5($token_tmp);

$user = new User();
$user->setUsername($_POST['username']);
$user->setEmail($_POST['email']);
$user->setSalt($salt);
$user->setHash($hash);
$user->setToken($token);

$isCreated = $user->create();

if (!$isCreated) {
    json(500, 'Error intentando crear usuario', true);
}
json(201, 'Usuario creado correctamente', false);