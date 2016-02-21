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

$url = "https://dubbase.fm/tracklist";
$html = file_get_contents($url);

$dom = new DOMDocument();

# The @ before the method call suppresses any warnings that
# loadHTML might throw because of invalid HTML in the page.
@$dom->loadHTML($html);

$xpath = new DomXpath($dom);

$site_content = $xpath->query('.//main[@id="site_content"]/div[not(contains(@id, "current_song"))]');

foreach ($site_content as $song) {
	$debugText = '';
	$time = $xpath->query('.//div[@class="song_time"]', $song)->item(0)->nodeValue;
	$timeStamp = getTimestamp($time);
	$debugText .= $time . ' [' . $timeStamp . '] ';

	$title = $xpath->query('.//div[@class="song_title"]', $song)->item(0)->nodeValue;
	$debugText .= $title . '<br>' . PHP_EOL;
	echo $debugText;
	$songs[] = array('time_played' => $timeStamp, 'title' => $title);
}

try {
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET time_zone='+00:00';");

    $sql = "INSERT INTO `". $table ."` (`time_played`, `title`) VALUES (:time_played, :title)";
    $stmt = $db->prepare($sql);
    
    foreach ($songs as $song) {
    	$stmt->bindValue(":time_played", $song['time_played']);
	    $stmt->bindValue(":title", $song['title']);
	    $stmt->execute();
    }

    if (!$stmt) {
		echo "ERROR:<br><pre>";
		echo $stmt->errorCode();
		echo "</pre>";
    }

} catch (PDOException $e) {
    echo $e->getMessage() . PHP_EOL;
}

$db = null;

/**
 * @param $hhmm String Hours and minutes (23:59)
 * @return int UTC Unixtimestamp
 */
function getTimestamp ($hhmm) {
	$exp = explode(':', $hhmm);
	$now = new DateTime();
    // DubbaseFM in Germany
    $now->setTimezone(new DateTimeZone('Europe/Berlin'));
	$now->setTime($exp[0], $exp[1], 0);
	return $now->getTimestamp();
}

function pr($variable){
    echo "<hr><pre>";
    print_r($variable);
    echo "</pre>";
}

