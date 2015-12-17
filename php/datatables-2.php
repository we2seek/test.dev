<?php 

header('Content-Type: application/json');
ini_set('display_errors', 1);
require_once("db_config.php");

$start = intval($_POST['start']);
$length = intval($_POST['length']);
$draw = (int)$_POST['draw'];
$ret = array('data' => array());


try {
    $dsn = "mysql:host=$host;dbname=$database;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET NAMES utf8");

    $sqlQuery = "SELECT id, FROM_UNIXTIME(`request`.`when`, '%Y-%m-%d %H:%i') AS `when` FROM request LIMIT :start, :length";
    $stmt = $db->prepare($sqlQuery);
    $stmt->bindValue(":start", $start, PDO::PARAM_INT);
    $stmt->bindValue(":length", $length, PDO::PARAM_INT);

    // if (strlen($brandName) == 2) {
    //     $stmt->bindValue(":brand", "(^$brandName[0].*[ &_-]+$brandName[1].*)|(.*$brandName.*)", PDO::PARAM_STR);
    // } else {
    //     $stmt->bindValue(":brand", ".*$brandName.*", PDO::PARAM_STR);
    // }

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

?>