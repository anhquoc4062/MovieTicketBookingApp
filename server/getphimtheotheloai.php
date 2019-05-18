<?php 
	include "connect.php";

	$page = $_GET['page'];
	$limit = 3;
	$offset = ($page - 1) * $limit;


	$query = "SELECT * FROM phim ORDER BY id_phim desc limit $offset, $limit";
	$data = mysqli_query($conn, $query);

	$mangphim = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangphim, new Phim(
	    	$row['id_phim'], 
	    	$row['ten_phim'], 
	    	$row['id_theloai'], 
	    	$row['hinh_phim'], 
	    	$row['thoiluong_phim'],
	    	$row['mota']
	    ));
	}

	echo json_encode($mangphim);

	class Phim{
		function Phim($id_phim, $ten_phim, $id_theloai, $hinh_phim, $thoiluong_phim, $mota){
			$this->id_phim = $id_phim;
			$this->ten_phim = $ten_phim;
			$this->id_theloai = $id_theloai;
			$this->hinh_phim = $hinh_phim;
			$this->thoiluong_phim = $thoiluong_phim;
			$this->mota = $mota;
		}
	}
 ?>