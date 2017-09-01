<?php
function saveData($ip,$startTime,$endTime,$pageName,$viewCount,$timeSpent,$action,$location)
{
	
	$db_username = 'root';
	$db_password = '';
	$db_name = 'test';
	$db_host = 'localhost';
	$mysqli = new mysqli($db_host, $db_username, $db_password,$db_name);

	if($action == 'start')
	{
		$q = "INSERT INTO track_user(ip_address,start_time,end_time,page_name,view_count,time_spent,user_location) VALUES('$ip','$startTime','$endTime','$pageName','$viewCount','$timeSpent','$location')";
	
	$mysqli->query($q);
	
	}
	else
	{
		$q = "UPDATE track_user SET end_time = '$endTime', time_spent = '$timeSpent' WHERE ip_address = '$ip' AND start_time = '$startTime' AND page_name = '$pageName'";
	
	$mysqli->query($q);
	}
	
	
}
?>
