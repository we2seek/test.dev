<?php

header('Content-Type: application/json');
ini_set('display_errors', 0);

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

if (!isset($_POST['offset'])) {
    header("HTTP/1.0 400 Bad Request. There are no required POST parameter: \"offset\".");
    exit;
}

// From JavaScript for example we get offset = -120 minutes for EET (+02:00)
$offset = (int)($_POST['offset']) * -1;
$sign = $offset >= 0 ? '1' : '-1';
$minutes = abs($offset);
$hours = floor($minutes / 60);
$minutes -= $hours * 60;
$offset = sprintf('%+03d:%02d', $hours * $sign, $minutes);

try {

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET time_zone='$offset';");

    $sql = "SELECT 
    			`id`, 
    			FROM_UNIXTIME(`time_played`, '%Y-%m-%d %H:%i:%s') as `time`,
    			`time_played` as `unixtime`,
    			`title`,
    			`saved`
    		FROM `" . $table . "`
    		ORDER BY `unixtime` DESC LIMIT 30;";
    $stmt = $db->prepare($sql);
    $stmt->execute();


    if (!$stmt) {
        echo $stmt->errorCode();
    } else {
        $records = $stmt->fetchAll();
        echo json_encode($records);
    }

} catch (PDOException $e) {
    echo $e->getMessage() . PHP_EOL;
}

$db = null;