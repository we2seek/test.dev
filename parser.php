<?php
$curl = curl_init();
$fp = fopen("somefile.txt", "w");
curl_setopt($curl, CURLOPT_URL, "http://vip-tv.org.ua/forum");
//curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_FILE, $fp);
curl_exec($curl);
curl_close($curl);
?>