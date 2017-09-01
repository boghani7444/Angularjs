// JavaScript Document

function start(pageName) {
		if (window.XMLHttpRequest) {
		xmlhttp3 = new XMLHttpRequest();
	  } else { 
		xmlhttp3 = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp3.onreadystatechange=function() {
		if (xmlhttp3.readyState==4 && xmlhttp3.status==200) {
		  //document.getElementById("downloadFormatList").innerHTML=xmlhttp3.responseText;
		}
	  }
	  xmlhttp3.open("GET","includes/trackStart.php?pageName="+pageName,true);
	  xmlhttp3.send();
	}
	
	
	function end() {
		if (window.XMLHttpRequest) {
		xmlhttp3 = new XMLHttpRequest();
	  } else { 
		xmlhttp3 = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp3.onreadystatechange=function() {
		if (xmlhttp3.readyState==4 && xmlhttp3.status==200) {
		  //document.getElementById("downloadFormatList").innerHTML=xmlhttp3.responseText;
		}
	  }
	  xmlhttp3.open("GET","includes/trackEnd.php",true);
	  xmlhttp3.send();
	}
