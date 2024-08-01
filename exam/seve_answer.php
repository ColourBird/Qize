<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:dbname=exam;host=127.0.0.1;charset=utf8", "root", "");

    $no = $_POST['no'];
    $exam_id = $_POST['exam_id'];
    $answer = $_POST['answer'];

    $stmt = $pdo->prepare("INSERT INTO answer (no, exam_id, answer) VALUES (?, ?, ?)");
    $stmt->execute([$no, $exam_id, $answer]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => "DB接続エラー: " . $e->getMessage()]);
}
?>
