<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
require_once("db_config.php");

if (isset($_GET["term"]) && preg_match("~^[a-zA-Zа-яіїєґёА-ЯІЇЄҐЁ0-9-\.]+$~", $_GET['term'])) {
    $brandName = $_GET["term"];
} else {
    die("Wrong GET parameter");
}

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET NAMES utf8");

    $sqlQuery = "SELECT id AS value, name AS label FROM brand WHERE name REGEXP :brand LIMIT 5";
    $stmt = $db->prepare($sqlQuery);

    if (strlen($brandName) == 2) {
        $stmt->bindValue(":brand", "(^$brandName[0].*[ &_-]+$brandName[1].*)|(.*$brandName.*)", PDO::PARAM_STR);
    } else {
        $stmt->bindValue(":brand", ".*$brandName.*", PDO::PARAM_STR);
    }

    $stmt->execute();

    echo json_encode($stmt->fetchAll());

} catch (PDOException $e) {
    echo $e->getMessage();
}

$db = null;