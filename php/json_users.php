<?php
header('Content-Type: application/json');
require_once("db_config.php");

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    $dbh = new PDO($dsn, $user, $pass, $opt);
    $dbh->exec("SET NAMES utf8");

    $stmt = $dbh->prepare("SELECT id, fio, reg_date, role_id FROM user WHERE deleted = 0");
    $stmt->execute();

    echo json_encode($stmt->fetchAll());

    $dbh = null;
} catch (PDOException $e) {
    print "DATABASE ERROR!: " . $e->getMessage() . "<br/>";
    die();
}