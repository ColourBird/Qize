<?php
// DB接続設定
$host='localhost';      //MySQL/MariaDBが稼働しているコンピュータ
$port='3306';           //ポート番号：ほぼこの値で固定
$dbname='exam';         //作業データベース名
$user='root';           //接続ユーザー名 
$pass='';               //接続パスワード

// PDOインスタンス作成
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    echo "DB接続エラー: " . $e->getMessage();
    exit();
}

// 質問を取得するクエリ
$sql = 'SELECT * FROM exam ORDER BY id ASC';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

// JSONとして質問を返す
header('Content-Type: application/json');
echo json_encode($questions);
?>
