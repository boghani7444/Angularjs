<?php session_start();
date_default_timezone_set("Asia/Kolkata");
require("dbHandler.php");

$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['startTime'] = $_SERVER['REQUEST_TIME'];
$_SESSION['pageName'] = $_GET['pageName'];

if(isset($_SESSION['pageViews']))
{
	$_SESSION['pageViews'] = $_SESSION['pageViews'] + 1;
}
else
{
	$_SESSION['pageViews'] = 0;
}

$ip = $_SESSION['ip'];
$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));
$user_location = $details->city . " , " . $details->country;

saveData($_SESSION['ip'],$_SESSION['startTime'],'0',$_SESSION['pageName'],$_SESSION['pageViews'],'0','start',$user_location);
?>