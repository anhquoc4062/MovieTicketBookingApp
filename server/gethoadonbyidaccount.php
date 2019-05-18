<?php 
	include "connect.php";
	$query = "SELECT * FROM theloai";
	$data = mysqli_query($conn, $query);

	$mangtheloai = array();
	while ($row = mysqli_fetch_assoc($data)) {
	    array_push($mangtheloai, new TheLoai(
	    	$row['id_theloai'], 
	    	$row['ten_theloai'], 
	    	$row['hinh_theloai']
	    ));
	}

	echo json_encode($mangtheloai);

	class TheLoai{
		function TheLoai($id_theloai, $ten_theloai, $hinh_theloai){
			$this->id_theloai = $id_theloai;
			$this->ten_theloai = $ten_theloai;
			$this->hinh_theloai = $hinh_theloai;
		}
	}
 ?>