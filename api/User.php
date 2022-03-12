<?php 
include_once (dirname(__FILE__).DIRECTORY_SEPARATOR.'DBConnection.php');

class User {

    private $id;
    private $username = '';
    private $email = '';
    private $salt = '';
    private $hash = '';
    private $token = '';
    private $created_at = '';

    public function __construct(array $data = array()) {
        $this->id         = isset($data['id']) ? $data['id'] : 0;
        $this->username   = isset($data['username']) ? $data['username'] : '';
        $this->email      = isset($data['email']) ? $data['email'] : '';
        $this->salt       = isset($data['salt']) ? $data['salt'] : '';
        $this->hash       = isset($data['hash']) ? $data['hash'] : '';
        $this->token      = isset($data['token']) ? $data['token'] : '';
        $this->created_at = isset($data['created_at']) ? $data['created_at'] : date('Y-m-d H:i:s');
    }

    // GETTERS

    public function getId() {
        return $this->id;
    }
    public function getUsername() {
        return $this->username;
    }
    public function getEmail() {
        return $this->email;
    }
    public function getHash() {
        return $this->hash;
    }
    public function getSalt() {
        return $this->salt;
    }
    public function getToken() {
        return $this->token;
    }
    public function getCreatedAt() {
        return $this->created_at;
    }


    // SETTERS
    public function setId(int $id): self {
        $this->id = (int) $id;
        return $this;
    }
    public function setUsername(string $username): self {
        $this->username = $username;
        return $this;
    }
    public function setEmail(string $email): self {
        $this->email = $email;
        return $this;
    }
    public function setHash(string $hash): self {
        $this->hash = $hash;
        return $this;
    }
    public function setSalt(string $salt): self {
        $this->salt = $salt;
        return $this;
    }
    public function setToken(string $token): self {
        $this->token = $token;
        return $this;
    }
    public function setCreatedAt(string $created_at): self {
        $this->created_at = $created_at;
        return $this;
    }

    
    // ↓_DATABASE METHODS_↓
    public static function find(int $id, $model = false)  {
        $db = DBConnection::getConnection();
        $sql = "SELECT * FROM users WHERE id = ? LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $model ? new User($result->fetch_assoc()) : $result->fetch_assoc();
    }

    public static function findByEmail(string $email, $model = false) {
        $db = DBConnection::getConnection();
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $model ? new User($result->fetch_assoc()) : $result->fetch_assoc();
    }

    public static function existsByToken(string $token) {
        $db = DBConnection::getConnection();
        $sql = "SELECT id FROM users WHERE token = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $token);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        return (bool) $result->num_rows > 0;
    }

    public static function findAll($json = false) {
        $db = DBConnection::getConnection();
        $sql = "SELECT * FROM users";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $plants = [];
        
        while ($row = $result->fetch_assoc()) {
            $plants[] = (array) $row;
        }        

        $stmt->close();
        return $json ? json_encode($plants) : $plants;
    }

    public function create() {
        $db = DBConnection::getConnection();
        $sql = "INSERT INTO users (username, email, salt, hash, token, created_at) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('ssssss', $this->username, $this->email, $this->salt, $this->hash, $this->token, $this->created_at);
        $isCreated = $stmt->execute();
        $stmt->close();

        return $isCreated;
    }
}