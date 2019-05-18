<?php 
	include "connect.php";
	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);

	$imgname = $obj['imgname'];
	$idaccount = $obj['idaccount'];

	$query = "UPDATE ACCOUNT SET avatar = '$imgname' WHERE id_account = '$idaccount'";
	if(mysqli_query($conn, $query)){
		echo json_encode([
			"Message" => "Success",
		]);
	}
	else{
		echo json_encode([
			"Message" => "Fail",
		]);
	}
 ?>