<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $db = new PDO("mysql:dbname=mydb2;host=127.0.0.1;charset=utf8", "root", "");
        $stmt = $db->prepare("INSERT INTO answer (no, exam_id, answer) VALUES (:no, :exam_id, :answer)");
        $stmt->bindParam(':no', $_POST['no']);
        $stmt->bindParam(':exam_id', $_POST['exam_id']);
        $stmt->bindParam(':answer', $_POST['answer']);
        $stmt->execute();
    } catch (PDOException $e) {
        echo "DB接続エラー: " . $e->getMessage();
    }
}
?>
