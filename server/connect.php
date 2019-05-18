<?php 
	$hostname = "localhost";
	$username = "root";
	$password = "";
	$database = "appxemphim";

	$conn = mysqli_connect($hostname, $username, $password, $database);
	mysqli_query($conn, "SET NAMES 'utf8'");
 ?>