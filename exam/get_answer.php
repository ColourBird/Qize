<?php
header('Content-Type: application/json');
// include 'db.php';

try {
    $db = new PDO("mysql:dbname=mydb2;host=127.0.0.1;charset=utf8", "root", "");
    
    // クエリで問題とユーザーの回答を取得
    $query = "
        SELECT exam.*, answer.answer AS userAnswer 
        FROM exam 
        LEFT JOIN answer 
        ON exam.id = answer.exam_id 
        WHERE answer.no = 1
        ORDER BY exam.id ASC";
    $stmt = $db->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => "DB接続エラー: " . $e->getMessage()]);
}
?>
