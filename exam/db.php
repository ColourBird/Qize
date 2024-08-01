
<?php
#DB接続
try{
    $db = new PDO("mysql:dbname=mydb2;host=127.0.0.1;charset=utf8","root",""); 
    // クエリ実行例
    $query = "SELECT * FROM exam";
    $stmt = $db->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
    // 結果表示
    foreach ($results as $row) {
        echo "ID: " . htmlspecialchars($row['id']) . "<br>";
        echo "タイトル: " . htmlspecialchars($row['title']) . "<br>";
        echo "解説: " . htmlspecialchars($row['description']) . "<br>";
        echo "解答1: " . htmlspecialchars($row['answer1']) . "<br>";
        echo "解答2: " . htmlspecialchars($row['answer2']) . "<br>";
        echo "解答3: " . htmlspecialchars($row['answer3']) . "<br>";
        echo "解答4: " . htmlspecialchars($row['answer4']) . "<br>";
        echo "正解: " . htmlspecialchars($row['correct']) . "<br><br>";
    }
            
    }catch (PDOException $e) {
        echo "DB接続エラー".$e->getMessage();
        die();
    };
?>