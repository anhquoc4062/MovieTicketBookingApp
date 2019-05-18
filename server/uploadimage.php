<?php
$target_dir = "uploads/avatar";

if(!file_exists($target_dir)){
	mkdir($target_dir,0777,true);
}
$filename = rand().'_'.time() .'.jpeg';
$target_dir = $target_dir ."/".$filename;

if(move_uploaded_file($_FILES['image']['tmp_name'], $target_dir)){
	echo json_encode([
		"Message" => "Success",
		"filename" => $filename
	]);
}
else{
	echo json_encode([
		"Message" => "Fail"
	]);
}
?>