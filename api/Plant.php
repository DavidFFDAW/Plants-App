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
    public function setLastTimeWatered(?string $last_time_watered): self {
        $this->last_time_watered = $last_time_watered;
        return $this;
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

    public static function findAll($json = false) {
        $db = DBConnection::getConnection();
        $sql = "SELECT * FROM plants";
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

    public function create(): bool {
        $db = DBConnection::getConnection();
        $sql = "INSERT INTO plants (name, real_name, image, description, location, extra_location, type, created_at, last_time_watered)";
        $sql .= " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('sssssssss', $this->name, $this->real_name, $this->image, $this->description, $this->location, $this->extra_location, $this->type, $this->created_at, $this->last_time_watered);
        $created = $stmt->execute();
        $stmt->close();

        return $created;
    }

    public function update(): bool {
        $db = DBConnection::getConnection();
        $sql = "UPDATE plants SET name = ?, real_name = ?, image = ?, description = ?, location = ?, extra_location = ?, type = ?, created_at = ?, last_time_watered = ? WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('sssssssssi', $this->name, $this->real_name, $this->image, $this->description, $this->location, $this->extra_location, $this->type, $this->created_at, $this->last_time_watered, $this->id);
        $updated = $stmt->execute();
        $stmt->close();

        return $updated;
    }


    public function __toString()
    {
        return (string) "<br><strong>Plant: </strong>" . $this->name . "</br>" .
               "<strong>Real Name: </strong>" . $this->real_name . "</br>" .
               "<strong>Description: </strong>" . $this->description . "</br>" .
               "<strong>Image: </strong>" . $this->image . "</br>" .
               "<strong>Location: </strong>" . $this->location . "</br>" .
               "<strong>Extra Location: </strong>" . $this->extra_location . "</br>" .
               "<strong>Type: </strong>" . $this->type . "</br>" .
               "<strong>Created At: </strong>" . $this->created_at . "</br>" .
               "<strong>Last Time Watered: </strong>" . $this->last_time_watered . "</br>";
    }
}