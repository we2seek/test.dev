<?php
ini_set('display_errors', 1); 
error_reporting(-1);

$host   = "localhost";
$dbname = "dubbasefm";
$table  = "songs";
$user   = "root";
$pass   = "Integer7_";

$url = "https://dubbase.fm/tracklist";
$html = file_get_contents($url);

$dom = new DOMDocument();

# The @ before the method call suppresses any warnings that
# loadHTML might throw because of invalid HTML in the page.
@$dom->loadHTML($html);

$xpath = new DomXpath($dom);

$site_content = $xpath->query('.//main[@id="site_content"]/div[not(contains(@id, "current_song"))]');

/*var_dump($site_content);
foreach ($site_content as $song) {
	echo $song->nodeName, ": ", $song->nodeValue, "<br>";
}*/


$songs;
foreach ($site_content as $song) {
	$debugText = '';
	$time = $xpath->query('.//div[@class="song_time"]', $song)->item(0)->nodeValue;
	$timeStamp = getTimestamp($time);
	$debugText .= $time . ' [' . $timeStamp . '] ';

	$title = $xpath->query('.//div[@class="song_title"]', $song)->item(0)->nodeValue;
	$debugText .= $title . '<br>' . PHP_EOL;
	echo $debugText;
	$songs[] = array('time' => $timeStamp, 'title' => $title);
}


/*echo "<pre>";
var_dump($songs);
echo "</pre>";
*/

define('TIMEZONE', 'Europe/Kiev');
date_default_timezone_set(TIMEZONE);

// to set timezone in mysql: SET time_zone='offset';
// where offset is a string value representing the difference to UTC/GMT,
// e.g. ‘-4:00′, ‘+3:00′, ‘+10:30′, etc. Note that the +/- sign is essential
// — even for zero — and timezone offsets are not necessarily a whole hour.

// create a new DateTime object, find the offset in seconds, and convert it to minutes
$now = new DateTime();
$mins = $now->getOffset() / 60;

// We can now calculate whole hours and minutes. The first line determines whether the offset is positive or negative,
// then converts the value to a positive number to make the calculation easier
$sgn = ($mins < 0 ? -1 : 1);
$mins = abs($mins);
$hrs = floor($mins / 60);
$mins -= $hrs * 60;

$offset = sprintf('%+d:%02d', $hrs*$sgn, $mins);

try {
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $opt = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    $db = new PDO($dsn, $user, $pass, $opt);
    $db->exec("SET time_zone='$offset';");

    $sql = "INSERT INTO `". $table ."` (`time`, `title`) VALUES (:time, :title)";
    $stmt = $db->prepare($sql);
    
    foreach ($songs as $song) {
    	$stmt->bindValue(":time", $song['time']);
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

function getTimestamp ($hhmm) {
	$exp = explode(':', $hhmm);
	$now = new DateTime();
	// Dubbase FM in Germany
	$now->setTimezone(new DateTimeZone('Europe/Berlin'));
	$now->setTime($exp[0], $exp[1], 0);
	return $now->getTimestamp();
}