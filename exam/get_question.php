<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:dbname=exam;host=localhost;charset=utf8", "root", "");

    $query = "SELECT * FROM exam ORDER BY id ASC";
    $stmt = $pdo->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "DB接続エラー: " . $e->getMessage()]);
}
?>
