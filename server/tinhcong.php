<?php
	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);

	$number1 = $obj["number1"];
	$number2 = $obj["number2"];
	$res = $number1 + $number2;

?>
{"res":"<?=$res?>"}