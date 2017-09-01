<?php session_start();
date_default_timezone_set("Asia/Kolkata");
require("dbHandler.php");
$_SESSION['endTime'] = $_SERVER['REQUEST_TIME'];
$timeSpent = $_SESSION['endTime'] - $_SESSION['startTime'];
$timeSpent = $timeSpent . " seconds";

saveData($_SESSION['ip'],$_SESSION['startTime'],$_SESSION['endTime'],$_SESSION['pageName'],$_SESSION['pageViews'],$timeSpent,'end');
?>