<?php 
	include "connect.php";
	$keyword = $_GET['keyword'];
	$query = "SELECT * FROM phim WHERE ten_phim LIKE '%$keyword%'";
	$data = mysqli_query($conn, $query);

	$mangphimtheoten = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangphimtheoten, new PhimTheoTen(
	    	$row['id_phim'],
	    	$row['ten_phim'],
	    	$row['id_theloai'],
	    	$row['hinh_phim'],
	    	$row['thoiluong_phim'],
	    	$row['mota']
	    ));
	}

	echo json_encode($mangphimtheoten);

	class PhimTheoTen{
		function PhimTheoTen($id_phim, $ten_phim, $id_theloai, $hinh_phim, $thoiluong_phim, $mota){
			$this->id_phim = $id_phim;
			$this->ten_phim = $ten_phim;
			$this->id_theloai = $id_theloai;
			$this->hinh_phim = $hinh_phim;
			$this->thoiluong_phim = $thoiluong_phim;
			$this->mota = $mota;
		}
	}
 ?>