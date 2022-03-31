<?php
include_once (dirname(__FILE__).DIRECTORY_SEPARATOR.'DBConnection.php');

class Search {

    private $id;
    private $search = '';
    private $times_searched = 1;
    private $date_searched = '';
    private $results = 0;

    public function __construct(array $data = array()) {
        $this->id             = isset($data['id']) ? $data['id'] : 0;
        $this->search           = isset($data['search']) ? $data['search'] : '';
        $this->times_searched      = isset($data['times_searched']) ? $data['times_searched'] : 1;
        $this->date_searched      = isset($data['date_searched']) ? $data['date_searched'] : '';
        $this->results          = isset($data['results']) ? $data['results'] : 0;
    }

    public function getId(): int {
        return (int) $this->id;
    }
    public function getSearch(): string {
        return (string) $this->search;
    }
    public function getTimesSearched(): int {
        return (int) $this->times_searched;
    }
    public function getDateInWhichWasSearched(): string {
        return (int) $this->date_searched;
    }
    public function getNumberOfResultsGivenBySearch(): int {
        return (int) $this->results;
    }

    public function setId(int $id): self {
        $this->id = $id;
        return $this;
    }
    public function setSearchValue(string $value): self {
        $this->search = $value;
        return $this;
    }
    public function setHowManyTimesHasBeenSearched(int $times): self {
        $this->times_searched = $times;
        return $this;
    }
    public function setDateInWhichWasSearched(string $date): self {
        $this->date_searched = $date;
        return $this;
    }
    public function setNumberOfResultsGiven(int $numberResults): self {
        $this->results = $numberResults;
        return $this;
    }



    public static function find(string $search, $model = false) {
        $db = DBConnection::getConnection();

        $sql = "SELECT * FROM searchs WHERE `search` = ? LIMIT 1";
        $stmt = $db->prepare($sql);
        $stmt->bind_param('s', $search);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows <= 0) return false;
    
        $stmt->close();
        return $model ? new Search($result->fetch_assoc()) : $result->fetch_assoc();        
    }

    public static function findAll(bool $json = false) {
        $db = DBConnection::getConnection();

        $sql = "SELECT * FROM searchs WHERE `search`";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $searches = [];
        
        if ($result->num_rows <= 0) return $searches;
        
        while ($row = $result->fetch_assoc()) {
            $searches[] = (array) $row;
        }

        $stmt->close();
        return $model ? json_encode($searches) : $searches;      
    }

    public static function insert(string $searchValue, string $date): bool {
        $db = DBConnection::getConnection();

        $finalDate = (isset($date) && !empty($date)) ? $date : date('Y-m-d H:i:s');
        $sq = "INSERT INTO searchs(`search`, `date_searched`) VALUES (?, ?)";
        $stmt = $db->prepare($sq);
        $stmt->bind_param('ss', $search, $finalDate);

        return $stmt->execute();
    }

    public static function incrementOrInsertSearch($search, $date): bool {
        $db = DBConnection::getConnection();

        $searchDB = Search::find($search, true);
        
        if (!isset($searchDB) || !$searchDB) {
            return Search::insert();
        }
        $sq = "UPDATE searchs SET `times_searched` = `times_searched` + 1 WHERE id = ?";
        $searchDatabaseID = $searchDB->getId();
        $stmt = $db->prepare($sq);
        $stmt->bind_param('i', $searchDatabaseID);
        
        return $stmt->execute();
    }
}