<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:dbname=exam;host=127.0.0.1;charset=utf8", "root", "");

    $stmt = $pdo->query("SELECT * FROM answer WHERE no = 1 ORDER BY exam_id ASC");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "DB接続エラー: " . $e->getMessage()]);
}
?>
