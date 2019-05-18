<?php 
	include "connect.php";
	$idaccount = $_GET['idaccount'];
	$query = "SELECT `phim`.id_phim, hinh_phim, ten_phim, thoiluong_phim, giochieu, ngaychieu, tongtien  FROM `phim`, `hoadon` WHERE `phim`.`id_phim` = `hoadon`.`id_phim` AND `hoadon`.`id_account` = '$idaccount' ORDER BY id_hoadon DESC";
	$data = mysqli_query($conn, $query);

	$mangphim = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangphim, new PhimDaDat(
	    	$row['id_phim'],
	    	$row['ten_phim'],
	    	$row['hinh_phim'],
	    	$row['thoiluong_phim'],
	    	$row['giochieu'],
	    	$row['ngaychieu'],
	    	$row['tongtien'],
	    ));
	}

	echo json_encode($mangphim);

	class PhimDaDat{
		function PhimDaDat($id_phim, $ten_phim, $hinh_phim, $thoiluong_phim, $giochieu, $ngaychieu, $tongtien){
			$this->id_phim = $id_phim;
			$this->ten_phim = $ten_phim;
			$this->hinh_phim = $hinh_phim;
			$this->thoiluong_phim = $thoiluong_phim;
			$this->giochieu = $giochieu;
			$this->ngaychieu = $ngaychieu;
			$this->tongtien = $tongtien;
		}
	}
 ?>