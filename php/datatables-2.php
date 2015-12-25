<?php

header('Content-Type: application/json');
ini_set('display_errors', 1);
require_once("db_config.php");

if (isset($_POST['start'])) {
    $start = (int)$_POST['start'];
} else {
    $start = 0;
}

if (isset($_POST['length'])) {
    $length = (int)$_POST['length'];
} else {
    $length = 999999;
}

if (isset($_POST['draw'])) {
    $draw = (int)$_POST['draw'];
} else {
    $draw = 0;
}

$order = '';

if (isset($_POST['order']) && is_array($_POST['order']) && count($_POST['order'])) {
    $columns = array(
        '`id`',
        '`when`',
        '`runtime`',
    );
    $order = 'ORDER BY ';
    foreach ($_POST['order'] as $o) {
        $order .= $columns[$o['column']] . ' ' .$o['dir'] . ', ';
    }
    $order = rtrim($order, ', ');
} else {
    $order = 'ORDER BY ' . $columns[0] . ' DESC ';
}

try {

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET NAMES utf8");

    $sqlQuery = "SELECT
                  id,
                  FROM_UNIXTIME(`request`.`when`, '%d-%m-%Y %H:%i') AS `when`,
                  FROM_UNIXTIME(`request`.`runtime`, '%d-%m-%Y %H:%i') AS `runtime`
                  FROM request "
                    . $order
                    . " LIMIT :start, :length";
    $stmt = $db->prepare($sqlQuery);
    $stmt->bindValue(":start", $start, PDO::PARAM_INT);
    $stmt->bindValue(":length", $length, PDO::PARAM_INT);

    $stmt->execute();
    $fetch = $stmt->fetchAll();
    $ret = array('data' => $fetch);

    // Count total records
    $stmt = $db->prepare("SELECT count(*) FROM request");
    $stmt->execute();

    $ret['recordsTotal'] = $stmt->fetchColumn();
    $ret['recordsFiltered'] = $ret['recordsTotal'];
    $ret['draw'] = $draw;

    echo json_encode($ret);

} catch (PDOException $e) {
    echo $e->getMessage();
}

$db = null;