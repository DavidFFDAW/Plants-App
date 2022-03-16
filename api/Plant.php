<?php 
include_once (dirname(__FILE__).DIRECTORY_SEPARATOR.'DBConnection.php');

class Plant {

    private $id;
    private $name = '';
    private $real_name = '';
    private $image = '';
    private $description = '';
    private $location = '';
    private $extra_location = '';
    private $type = ''; // solar, sombra, etc
    private $quantity = 1;
    private $water_quantity = false;
    private $created_at = '';
    private $last_time_watered = '';

    public function __construct(array $data = array()) {
        $this->id             = isset($data['id']) ? $data['id'] : 0;
        $this->name           = isset($data['name']) ? $data['name'] : '';
        $this->real_name      = isset($data['real_name']) ? $data['real_name'] : '';
        $this->image          = isset($data['image']) ? $data['image'] : '';
        $this->description    = isset($data['description']) ? $data['description'] : '';
        $this->location       = isset($data['location']) ? $data['location'] : '';
        $this->extra_location = isset($data['extra_location']) ? $data['extra_location'] : '';
        $this->type           = isset($data['type']) ? $data['type'] : '';
        $this->quantity       = isset($data['quantity']) ? $data['quantity'] : 1;
        $this->water_quantity = isset($data['water_quantity']) ? $data['water_quantity'] : false;
        $this->created_at     = isset($data['created_at']) ? $data['created_at'] : date('Y-m-d H:i:s');
        $this->last_time_watered = isset($data['last_time_watered']) ? $data['last_time_watered'] : '';
    }

    // GETTERS

    public function getId() {
        return $this->id;
    }
    public function getName() {
        return $this->name;
    }
    public function getRealName() {
        return $this->real_name;
    }
    public function getDescription() {
        return $this->description;
    }
    public function getImage() {
        return $this->image;
    }
    public function getLocation() {
        return $this->location;
    }
    public function getExtraLocation() {
        return $this->extra_location;
    }
    public function getType() {
        return $this->type;
    }
    public function getQuantity() {
        return $this->quantity;
    }
    public function getWaterQuantity() {
        return $this->water_quantity;
    }
    public function getCreatedAt() {
        return $this->created_at;
    }
    public function getLastTimeWatered() {
        return $this->last_time_watered;
    }


    // SETTERS

    public function setId(int $id): self {
        $this->id = (int) $id;
        return $this;
    }
    public function setName(string $name): self {
        $this->name = $name;
        return $this;
    }
    public function setRealName(string $real_name): self {
        $this->real_name = $real_name;
        return $this;
    }
    public function setDescription(string $description): self {
        $this->description = $description;
        return $this;
    }
    public function setImage(string $image): self {
        $this->image = $image;
        return $this;
    }
    public function setLocation(string $location): self {
        $this->location = $location;
        return $this;
    }
    public function setExtraLocation(string $extra_location): self {
        $this->extra_location = $extra_location;
        return $this;
    }
    public function setType(string $type): self {
        $this->type = $type;
        return $this;
    }
    public function setCreatedAt(string $created_at): self {
        $this->created_at = $created_at;
        return $this;
    }
    public function setQuantity(int $quantity): self {
        $this->quantity = $quantity;
        return $this;
    }
    public function setWaterQuantity(int $water_quantity): self {
        $this->water_quantity = $water_quantity;
        return $this;
    }
    public function setLastTimeWatered(?string $last_time_watered): self {
        $this->last_time_watered = $last_time_watered;
        return $this;
    }


    private static function daysSinceLastWatering($wa, DateTime $now) {
        if (!isset($wa) || !$wa) return false;

        $lastTimeWatered = new DateTime($wa);
        $diff = $now->diff($lastTimeWatered);
        
        return $diff->d;
    }

    
    // ↓_DATABASE METHODS_↓
    public static function find(int $id, $model = false)  {
        $db = DBConnection::getConnection();
        $sql = "SELECT * FROM plants WHERE id = ? LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt->close();
        return $model ? new Plant($result->fetch_assoc()) : $result->fetch_assoc();
    }

    public static function findAll($json = false, $limit = false, $offset = false) {
        $db = DBConnection::getConnection();
        $simpleSQL = "SELECT * FROM plants";
        $pagedSQL = "SELECT * FROM plants LIMIT $limit OFFSET $offset";
        $sql = ($limit) ? $pagedSQL : $simpleSQL;
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $now = new DateTime('NOW');
        $plants = [];
        
        while ($row = $result->fetch_assoc()) {
            $row['watered_days_ago'] = self::daysSinceLastWatering($row['last_time_watered'],$now);
            if ($limit) $row['next'] = "http://vps-f87b433e.vps.ovh.net/plants/api/getPlants.php?limit=$limit&offset=" .($offset + $limit);
            $plants[] = (array) $row;
        }        

        $stmt->close();
        return $json ? json_encode($plants) : $plants;
    }

    public static function findAllPaged($json = false, $limit = false, $offset = false) {
        $db = DBConnection::getConnection();
        $sql = "SELECT * FROM plants LIMIT $limit OFFSET $offset";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $now = new DateTime('NOW');
        $plants = [];
        
        while ($row = $result->fetch_assoc()) {
            $row['watered_days_ago'] = self::daysSinceLastWatering($row['last_time_watered'],$now);
            $plants[][] = (array) $row;    
        }     

        if ($limit) $plants['next'] = "http://vps-f87b433e.vps.ovh.net/plants/api/getPlants.php?limit=$limit&offset=" .($offset + $limit);
        if ($offset > 0) $plants['prev'] = "http://vps-f87b433e.vps.ovh.net/plants/api/getPlants.php?limit=$limit&offset=" .(($offset - $limit) > 0 ? ($offset - $limit) : 0);

        $stmt->close();
        return $json ? json_encode($plants) : $plants;
    }   

    public function create(): bool {
        $db = DBConnection::getConnection();
        $sql = "INSERT INTO plants (name, real_name, image, description, location, extra_location, type, created_at, last_time_watered, quantity, water_quantity)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('sssssssssii', $this->name, $this->real_name, $this->image, $this->description, $this->location, $this->extra_location, $this->type, $this->created_at, $this->last_time_watered, $this->quantity, $this->water_quantity);
        $created = $stmt->execute();
        $stmt->close();

        return $created;
    }

    public function update(): bool {
        $db = DBConnection::getConnection();
        $sql = "UPDATE plants SET name = ?, real_name = ?, image = ?, description = ?, location = ?, extra_location = ?, type = ?, created_at = ?, last_time_watered = ?, quantity = ? WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('sssssssssii', $this->name, $this->real_name, $this->image, $this->description, $this->location, $this->extra_location, $this->type, $this->created_at, $this->last_time_watered, $this->quantity, $this->id);
        $updated = $stmt->execute();
        $stmt->close();

        return $updated;
    }

    public function updateField (string $key, $value) {
        $db = DBConnection::getConnection();
        $sql = "UPDATE plants SET `$key` = ? WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('si', $value, $this->id);
        $updated = $stmt->execute();
        $stmt->close();

        return $updated;
    }

    public function remove() {
        $db = DBConnection::getConnection();
        $sql = "DELETE FROM plants WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('i', $this->id);
        $removed = $stmt->execute();
        $stmt->close();

        return $removed;
    }


    public function __toString()
    {
        return array(
            'id'                => $this->id,
            'name'              => $this->name,
            'real_name'         => $this->real_name,
            'image'             => $this->image,
            'description'       => $this->description,
            'location'          => $this->location,
            'extra_location'    => $this->extra_location,
            'type'              => $this->type,
            'quantity'          => $this->quantity,
            'water_quantity'    => $this->water_quantity,
            'created_at'        => $this->created_at,
            'last_time_watered' => $this->last_time_watered,
        );
    }
}