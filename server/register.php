<?php 
	include 'connect.php';

	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);
	$username = $obj['username'];
	$email = $obj['email'];
	$password = md5($obj['password']);

	if($username != '' || $email != '' || $password != ''){
		$query = "INSERT INTO account(username_account, email_account, password_account) VALUES ('$username','$email', '$password')";
		if(mysqli_query($conn, $query)){
			echo "SUCCESS";
		}
		else{
			echo "FAIL";
		}
	}
	else{
		echo "FAIL";
	}
 ?>