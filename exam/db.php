<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <?php
        #DB接続
        try{
            $db = new PDO("mysql:dbname=mydb2;host=127.0.0.1;charset=utf8","root",""); 
        }catch (PDOException $e) {
            echo "DB接続エラー".$e->getMessage();
            die();
        };
        ?>
    </main>
</body>
</html>