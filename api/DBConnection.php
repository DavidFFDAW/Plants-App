<?php

class DBConnection {    
    private static $instance = null;
    private $conn;
    private $host = 'localhost';
    private $user = 'davidff';
    private $pass = 'root';
    private $db = 'plants_app';

    private function __construct()
    {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->db)
        or die("Connection failed");     
        $this->conn->set_charset('utf8');
    }

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new DBConnection();
        }
        return self::$instance;
    }
    
    private function _getConnection()
    {
        return $this->conn;
    }

    public static function getConnection()
    {
        return self::getInstance()->_getConnection();
    }
}