<?php 
	include "connect.php";

	$json = file_get_contents("php://input");
	$obj = json_decode($json, true);
	$idphim = $obj['idphim'];
	$idaccount = $obj['idaccount'];
	$ghedachon = $obj['ghedachon'];
	$combodachon = $obj['combodachon'];
	$giochieu = $obj['giochieu'];
	$ngaychieu = $obj['ngaychieu'];
	$tongtien = $obj['tongtien'];


	if($idphim != '' || $idaccount != '' || $ghedachon != '' || $combodachon != '' || $giochieu != '' || $ngaychieu != ''){
		$query_hoadon = "INSERT INTO `hoadon` (`id_account`, `id_phim`, `giochieu`, `ngaychieu`, `tongtien`) VALUES ('$idaccount', '$idphim', '$giochieu', '$ngaychieu', '$tongtien');";
		if(mysqli_query($conn, $query_hoadon)){
			$last_id = $conn->insert_id;

			//double decode 
			$ghedachon = json_decode($ghedachon, true);
			$ghedachon = json_decode($ghedachon, true);

			$query_ghedadat = "INSERT INTO `ghedadat` (`id_hoadon`, `ten_ghe`) VALUES";//."('1', 'H6')"
			foreach ($ghedachon as $key => $value) {
				$query_ghedadat .= " ('$last_id', '$value'),";
			}
			$query_ghedadat = rtrim($query_ghedadat,',');
			if(mysqli_query($conn, $query_ghedadat)){
				if($combodachon != '[]'){
					//double decode 
					$combodachon = json_decode($combodachon, true);
					$combodachon = json_decode($combodachon, true);

					$query_combodadat = "INSERT INTO `combodadat` (`id_hoadon`, `id_combo`, `quantity`) VALUES";//."('1', 'H6')"
					foreach ($combodachon as $key => $value) {
						$id_combo = $value['id_combo'];
						$quantity = $value['quantity'];
						$query_combodadat .= " ('$last_id', '$id_combo', '$quantity'),";
					}
					$query_combodadat = rtrim($query_combodadat,',');
					if(mysqli_query($conn, $query_combodadat)){
						echo 'SUCCESS';
					}
					else{
						echo 'FAIL';
					}
				}
				else{
					echo 'SUCCESS';
				}
			}
			else{
				echo "FAIL";
			}

		}
		else{
			echo "FAIL";
		}
	}
	else{
		echo "FAIL";
	}
 ?>