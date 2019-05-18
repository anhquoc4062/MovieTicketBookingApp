<?php 
	include "connect.php";

	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);
	$idphim = $obj['idphim'];
	$giochieu = $obj['giochieu'];
	$ngaychieu = $obj['ngaychieu'];


	$query = "SELECT ten_ghe FROM `hoadon`, `ghedadat` WHERE `hoadon`.id_hoadon = `ghedadat`.id_hoadon AND id_phim = '$idphim' AND giochieu = '$giochieu' AND ngaychieu = '$ngaychieu'";
	$data = mysqli_query($conn, $query);

	$mangghedadat = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangghedadat, new GheDaDat(
	    	$row['ten_ghe']
	    ));
	}

	echo json_encode($mangghedadat);

	class GheDaDat{
		function GheDaDat($ten_ghe){
			$this->ten_ghe = $ten_ghe;
		}
	}
 ?>