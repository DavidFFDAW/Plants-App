<?php
    require_once './User.php';

    function json(int $code,string $message, bool $error, array $extra = array()): string {
        $array = array(
            'error' => $error,
            'code' => $code,
            'message' => $message,
        );
        if (!empty($extra)) {
            $array = array_merge($array, $extra);
        }
        http_response_code($code);
        die(json_encode($array));
    }

    function generalHeaders(){
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET,POST,DELETE,PUT,PATCH,OPTIONS");
        header("Access-Control-Allow-Headers: Authorization");
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            header("HTTP/1.1 200 OK");
            return;
        }
    }

    function headersWithMethod (string $method) {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: $method");
        header("Access-Control-Allow-Headers: Authorization");
        
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            header("HTTP/1.1 200 OK");
            return;
        }
        
        if ($_SERVER['REQUEST_METHOD'] !== $method) {
            json(405, 'Method not allowed', true);
        }
    }

    function validateHeaderToken () {
        $headers = apache_request_headers();

        if (!isset($headers['Authorization'])) {
            json(403,'No se ha enviado el token',true);
        }

        $token = str_replace('Bearer ','',$headers['Authorization']);
        $user = User::existsByToken($token);
        
        if (!isset($user) || empty($user) || !$user) {
            json(403,'El token no es correcto',true);
        }
    }

    function debugInsomnia ($deb) {
        http_response_code(200);
        die(json_encode($deb));
    }

    function existsNotEmpty ($field, $dfValue = '') {
        return (isset($field) && !empty($field)) ? $field : $dfValue;
    }

    function getRequestMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }
