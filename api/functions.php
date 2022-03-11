<?php

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

    
    function headersWithMethod (string $method) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: '.$method);
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, 
        Content-Type, Accept, Access-Control-Request-Method, Authorization");

        if ($_SERVER['REQUEST_METHOD'] != $method) {
            json(405, 'Method not allowed', true);
        }
    }
