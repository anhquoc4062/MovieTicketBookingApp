<?php 
	include "connect.php";
	$query = "SELECT * FROM phim WHERE id_theloai = 1 ORDER BY id_phim desc";
	$data = mysqli_query($conn, $query);

	$mangphimmoinhat = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangphimmoinhat, new PhimMoiNhat(
	    	$row['id_phim'],
	    	$row['ten_phim'],
	    	$row['id_theloai'],
	    	$row['hinh_phim'],
	    	$row['thoiluong_phim'],
	    	$row['mota']
	    ));
	}

	echo json_encode($mangphimmoinhat);

	class PhimMoiNhat{
		function PhimMoiNhat($id_phim, $ten_phim, $id_theloai, $hinh_phim, $thoiluong_phim, $mota){
			$this->id_phim = $id_phim;
			$this->ten_phim = $ten_phim;
			$this->id_theloai = $id_theloai;
			$this->hinh_phim = $hinh_phim;
			$this->thoiluong_phim = $thoiluong_phim;
			$this->mota = $mota;
		}
	}
 ?>