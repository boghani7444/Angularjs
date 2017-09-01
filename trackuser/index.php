<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>index page</title>
</head>

<body>
<h1>THIS IS INDEX PAGE</h1>

<a href="second.php">Go to second page</a>

<script src="includes/jsHandler.js"></script>
<script>
window.onload = function(){ return start('<?php echo basename($_SERVER['REQUEST_URI'], '?' . $_SERVER['QUERY_STRING']); ?>'); };
window.onbeforeunload = function(){ return end(); };
window.onclose = function(){ return end(); };
</script>
</body>
</html>
