<?php
include 'db.php';

$stmt = $pdo->query("SELECT * FROM answer WHERE no = 1 ORDER BY exam_id ASC");
$answers = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($answers);
?>