<?php
	require 'jwt.php';
	require 'connect.php';

	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);
	$username = $obj["username"];
	$password = md5($obj["password"]);

	$query = "SELECT * FROM account WHERE username_account = '$username' AND password_account = '$password'";
	$users = mysqli_query($conn, $query);

	if(mysqli_num_rows($users)==1){
		//login dung
		$row = mysqli_fetch_array($users);
		$token = array();
		$token['id'] = $row['id_account'];
		$token['username'] = $row['username_account'];
		$token['email'] = $row['email_account'];
		$token['avatar'] = $row['avatar'];

		$jsonwebtoken = JWT::encode($token, "secret_key");

		$info = [
		    'token' => $jsonwebtoken,
		    'id' => $token['id'],
		    'username' => $token['username'],
		    'email' => $token['email'],
		    'avatar' => $token['avatar']
		];

		echo json_encode($info);
	}
	else{
		//login sai
		echo '{"token":"ERROR"}';
	}

	
 ?>