<?php
ini_set('display_errors', 1);
error_reporting(-1);

// Home config
$host = "localhost";
$dbname = "dubbasefm";
$table = "songs";
$user = "root";
$pass = "Integer7_";

// Hosting config
//$host   = "mysql.hostinger.co.uk";
//$dbname = "u947120400_db";
//$table  = "songs";
//$user   = "u947120400_usr";
//$pass   = "Integer7_";

try {

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);

    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET time_zone='+00:00';");

    $selectQuery = "SELECT * FROM `" . $table . "`";

    $stmt = $db->query($selectQuery);

    $rows;
    if (!$stmt) {
        echo $stmt->errorCode();
    } else {
        $rows = $stmt->fetchAll();
    }

    if (!$rows) {
        echo "Empty query result...";
        return '';
    } else {
        pr($rows);
    }

    echo "Start updating...";

    $updateQuery = "UPDATE `songs` SET `full_title` = :full_title, `artist` = :artist, `title` = :title WHERE `id` = :id";
    $stmt = $db->prepare($updateQuery);

    foreach ($rows as $row) {
        $splited = explode(' - ', $row['title'], 2);
        $stmt->bindValue(':full_title', $row['title'], PDO::PARAM_STR);
        $stmt->bindValue(':artist', $splited[0], PDO::PARAM_STR);
        $stmt->bindValue(':title', $splited[1], PDO::PARAM_STR);
        $stmt->bindValue(':id', $row['id'], PDO::PARAM_INT);
        $stmt->execute();
    }

    if (!$stmt) {
        pr($stmt->errorCode());
    } else {
        echo "<b>ok</b>";
        pr($stmt);
    }

} catch (PDOException $e) {
    echo $e->getMessage() . PHP_EOL;
}

$db = null;

function pr($variable) {
    echo "<hr><pre>";
    print_r($variable);
    echo "</pre>";
}

