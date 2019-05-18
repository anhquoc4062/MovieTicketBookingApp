<?php 
	include "connect.php";
	$query = "SELECT * FROM combo";
	$data = mysqli_query($conn, $query);

	$mangcombo = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangcombo, new Combo(
	    	$row['id_combo'],
	    	$row['ten_combo'],
	    	$row['hinh_combo'],
	    	$row['gia_combo'],
	    	$row['mota_combo']
	    ));
	}

	echo json_encode($mangcombo);

	class Combo{
		function Combo($id_combo, $ten_combo, $hinh_combo, $gia_combo, $mota_combo){
			$this->id_combo = $id_combo;
			$this->ten_combo = $ten_combo;
			$this->hinh_combo = $hinh_combo;
			$this->gia_combo = $gia_combo;
			$this->mota_combo = $mota_combo;
		}
	}
 ?>