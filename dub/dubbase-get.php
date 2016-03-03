<?php
define('REMOTE', 'kkshki.esy.es');

if (strcmp($_SERVER['HTTP_HOST'], REMOTE) === 0) {

    ini_set('display_errors', 0);
    error_reporting(-1);

    // Hosting config
    $host = "mysql.hostinger.co.uk";
    $dbname = "u947120400_db";
    $table = "songs";
    $user = "u947120400_usr";
    $pass = "Integer7_";
} else {
    ini_set('display_errors', 1);
    error_reporting(1);

    // Home config
    $host = "localhost";
    $dbname = "dubbasefm";
    $table = "songs";
    $user = "root";
    $pass = "Integer7_";

}

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
$strOffset = sprintf('%+03d:%02d', $hours * $sign, $minutes);

// Today 00:00
$startOfToday = new DateTime();
$timezoneName = timezone_name_from_abbr("", $offset * 60, false);
$startOfToday->setTimezone(new DateTimeZone($timezoneName));
//$startOfToday->setTime(23, 59, 59);
$startOfToday->modify('-1 day');

try {

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);

    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET time_zone='$strOffset';");

    $sql = "SELECT 
    			`id`, 
    			FROM_UNIXTIME(`time`, '%d/%m %H:%i') as `ftime`,
    			`artist`,
    			`title`,
    			FROM_UNIXTIME(unix_timestamp(`saved`), '%d/%m %H:%i:%s') as `fsaved`
    		FROM `" . $table . "`
    		WHERE `time` >= :unixtime
    		ORDER BY `time` DESC";
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':unixtime', $startOfToday->getTimestamp(), PDO::PARAM_INT);
    $stmt->execute();

    $result = array();

    if (!$stmt) {
        $result['lastDay'] = null;
        $result['error'] = $stmt->errorCode();
    } else {
        $result['lastDay'] = $stmt->fetchAll();
    }

    $sql = "
    SELECT 
        s.artist, s.title, COUNT(s.title) AS cnt_title, s1.cnt AS cnt_artist 
    FROM 
        songs s 
    JOIN (
        SELECT 
            artist, COUNT(artist) AS cnt 
        FROM 
            songs 
        GROUP BY 
            artist
        HAVING
            cnt > 10
        ) AS s1 ON s.artist = s1.artist 
    GROUP BY 
        s.title 
    ORDER BY 
        s1.cnt DESC, s.artist, cnt_title DESC, s.title;";

    $stmt = $db->prepare($sql);
    $stmt->execute();
    
    $rows = array();
    if (!$stmt) {
        $result['total'] = null;
        $result['error'] = $stmt->errorCode();
    } else {
        $rows = $stmt->fetchAll();
    }
    
    foreach ($rows as $row) {
        $result['total'][$row['artist']]['songs'][] = array('title' => $row['title'], 'count' => $row['cnt_title']);
        $result['total'][$row['artist']]['total'] = $row['cnt_artist'];
    }

    echo json_encode($result);

} catch (PDOException $e) {
    echo $e->getMessage() . PHP_EOL;
}

$db = null;