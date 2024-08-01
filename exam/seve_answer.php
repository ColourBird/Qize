<?php
header('Content-Type: application/x-www-form-urlencoded');

try {
    $pdo = new PDO("mysql:dbname=exam;host=localhost;charset=utf8", "root", "");

    $no = $_POST['no'];
    $exam_id = $_POST['exam_id'];
    $answer = $_POST['answer'];

    $query = "INSERT INTO answer (no, exam_id, answer) VALUES (?, ?, ?) 
              ON DUPLICATE KEY UPDATE answer=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$no, $exam_id, $answer, $answer]);

    echo "回答が保存されました";
} catch (PDOException $e) {
    echo "DB接続エラー: " . $e->getMessage();
}
?>
