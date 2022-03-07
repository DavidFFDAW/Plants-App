<?php
require_once './EnvReader.php';

class DBConnection {    
    private static $instance = null;
    private $conn;
    private $host = '';
    private $user = '';
    private $pass = '';
    private $db = '';

    private function __construct()
    {
        $env = EnvReader::getInstance();
        $this->host = $env->get('DB_HOST');
        $this->user = $env->get('DB_USER');
        $this->pass = $env->get('DB_PASSWORD');
        $this->db = $env->get('DB_NAME');
        
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