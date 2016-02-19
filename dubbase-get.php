<?php

header('Content-Type: application/json');
ini_set('display_errors', 0);

$host   = "localhost";
$dbname = "dubbasefm";
$table  = "songs";
$user   = "root";
$pass   = "Integer7_";

try {
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    $db = new PDO($dsn, $user, $pass, $opt);

    $sql = "SELECT 
    			`id`, 
    			FROM_UNIXTIME(`time`, '%Y-%m-%d %H:%i:%s') as `time`,
    			`title`,
    			`saved`
    		FROM `". $table ."` 
    		ORDER BY `id`;";
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