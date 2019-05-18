<?php 
	include "connect.php";

	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);
	$idphim = $obj['idphim'];


	$query = "SELECT * FROM phim WHERE id_phim = '$idphim'";
	$data = mysqli_query($conn, $query);

	$mangphim = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangphim, new Phim(
	    	$row['id_phim'], 
	    	$row['ten_phim'], 
	    	$row['id_theloai'], 
	    	$row['hinh_phim'], 
	    	$row['thoiluong_phim'],
	    	$row['mota'],
	    	$row['trailer_phim'],
	    	$row['banner_phim']
	    ));
	}

	echo json_encode($mangphim);

	class Phim{
		function Phim($id_phim, $ten_phim, $id_theloai, $hinh_phim, $thoiluong_phim, $mota, $trailer_phim, $banner_phim){
			$this->id_phim = $id_phim;
			$this->ten_phim = $ten_phim;
			$this->id_theloai = $id_theloai;
			$this->hinh_phim = $hinh_phim;
			$this->thoiluong_phim = $thoiluong_phim;
			$this->mota = $mota;
			$this->trailer_phim = $trailer_phim;
			$this->banner_phim = $banner_phim;
		}
	}
 ?>