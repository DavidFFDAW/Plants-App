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

        die(json_encode($array));
    }

    json(200, 'Se recibieron las plantas de forma correcta', false, array('plant' => 'pl'));
?>