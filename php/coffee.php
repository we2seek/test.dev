<?php

header('Content-Type: application/json');
ini_set('display_errors', 1);

if (!isset($_POST['timer'])) {
    header("HTTP/1.0 400 Bad Request. There are no required POST parameter.");
    exit;
}

$host = "localhost";
$database = "timer";
$user = "root";
$pass = "Integer7_";

$seconds = (int)$_POST["timer"];

try {
    $dsn = "mysql:host=$host;dbname=$database;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    $db = new PDO($dsn, $user, $pass, $opt);

    // add new record
    if ($seconds != -1) {
        $sql = "INSERT INTO `without_coffee` (seconds) VALUES (:seconds)";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(":seconds", $seconds);
        $stmt->execute();
    }

    // records list
    $sql = "SELECT DATE_FORMAT(`date`, '%Y-%m-%d %H:%i') AS `date`, `seconds` FROM `without_coffee` ORDER BY `date` DESC LIMIT 10";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $records = $stmt->fetchAll();

    // top result
    $stmt = $db->prepare("SELECT DATE_FORMAT(`date`, '%Y-%m-%d %H:%i') AS `date`, `seconds` FROM `without_coffee` ORDER BY `seconds` DESC LIMIT 1");
    $stmt->execute();
    $top = $stmt->fetchAll();
    // print_r($top); exit();
    $return = array();
    if (isset($top[0])) {
        $return["max_date"] = $top[0]["date"];
        $return["max_seconds"] = $top[0]["seconds"];
    }

    if (isset($records)) {
        $return["records"] = $records;
    }

    echo json_encode($return);

} catch (PDOException $e) {
    echo $e->getMessage();
}

$db = null;