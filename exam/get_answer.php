<?php
header('Content-Type: application/json');
// include 'db.php';

try {
    $db = new PDO("mysql:dbname=mydb2;host=127.0.0.1;charset=utf8", "root", "");
    $query = "SELECT * FROM exam";
    $stmt = $db->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "DB接続エラー: " . $e->getMessage()]);
}
?>
