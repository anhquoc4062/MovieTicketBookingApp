-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th5 18, 2019 lúc 12:44 AM
-- Phiên bản máy phục vụ: 10.3.14-MariaDB
-- Phiên bản PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `id9290597_appxemphim`
--
CREATE DATABASE IF NOT EXISTS `id9290597_appxemphim` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id9290597_appxemphim`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id_account` int(11) NOT NULL,
  `username_account` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email_account` text COLLATE utf8_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8_unicode_ci NOT NULL,
  `password_account` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id_account`, `username_account`, `email_account`, `avatar`, `password_account`) VALUES
(1, 'anhquoc4062', 'anhquoc4062@gmail.com', '1984778685_1557912048.jpeg', 'ce6eee13374e007c3236c2bbd5ba3f62'),
(9, 'user', 'user@abc.con', '1201049197_1557914728.jpeg', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `combo`
--

CREATE TABLE `combo` (
  `id_combo` int(11) NOT NULL,
  `ten_combo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `hinh_combo` text COLLATE utf8_unicode_ci NOT NULL,
  `gia_combo` float NOT NULL,
  `mota_combo` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `combo`
--

INSERT INTO `combo` (`id_combo`, `ten_combo`, `hinh_combo`, `gia_combo`, `mota_combo`) VALUES
(1, 'Hotdog', 'hotdog.png', 3, '1 Hotdog + 1 Nước lớn. Nhận trong ngày xem phim.'),
(2, 'Single Combo', 'single.png', 3.5, '1 Bắp vừa + 1 nước lớn. Nhận trong ngày xem phim. '),
(3, 'Couple Combo', 'couple.png', 4, '1 Bắp lớn + 2 nước lớn. Nhận trong ngày xem phim.'),
(4, 'Trà Sữa', 'trasua.png', 1.5, '1 Trà Sữa. Nhận trong ngày xem phim. '),
(5, 'BUMBLEBEE COMBO', 'bumble.png', 9, '1 Bumblebee cup + 1 Popcorn. Redeem on showing date. '),
(6, 'GUDETAMA COMBO', 'gudta.png', 8.5, '1 Ly nước Gudetama + 1 Bắp. Nhận trong ngày xem phim. ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `combodadat`
--

CREATE TABLE `combodadat` (
  `id_combodadat` int(11) NOT NULL,
  `id_hoadon` int(11) NOT NULL,
  `id_combo` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `combodadat`
--

INSERT INTO `combodadat` (`id_combodadat`, `id_hoadon`, `id_combo`, `quantity`) VALUES
(1, 34, 2, 2),
(2, 34, 3, 1),
(3, 35, 3, 2),
(4, 35, 2, 1),
(5, 36, 3, 2),
(6, 36, 2, 1),
(7, 38, 3, 2),
(8, 38, 2, 1),
(9, 39, 1, 2),
(10, 39, 2, 2),
(11, 41, 3, 2),
(12, 41, 2, 1),
(13, 43, 3, 2),
(14, 43, 2, 1),
(15, 44, 2, 1),
(16, 45, 2, 3),
(17, 46, 3, 2),
(18, 47, 2, 1),
(19, 47, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ghedadat`
--

CREATE TABLE `ghedadat` (
  `id_ghedadat` int(11) NOT NULL,
  `id_hoadon` int(11) NOT NULL,
  `ten_ghe` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ghedadat`
--

INSERT INTO `ghedadat` (`id_ghedadat`, `id_hoadon`, `ten_ghe`) VALUES
(1, 1, 'G6'),
(2, 1, 'G7'),
(9, 28, 'H5'),
(10, 28, 'H6'),
(11, 28, 'H7'),
(12, 29, 'G6'),
(13, 29, 'G7'),
(14, 29, 'G8'),
(27, 34, 'H6'),
(28, 34, 'H7'),
(29, 34, 'H8'),
(30, 35, 'G6'),
(31, 35, 'G7'),
(32, 36, 'G8'),
(33, 36, 'G9'),
(34, 37, 'I6'),
(35, 37, 'I7'),
(36, 38, 'G6'),
(37, 38, 'G7'),
(38, 38, 'G8'),
(39, 39, 'G7'),
(40, 39, 'G8'),
(41, 39, 'G9'),
(42, 40, 'I7'),
(43, 40, 'I8'),
(44, 41, 'I7'),
(45, 41, 'I8'),
(46, 42, 'J6'),
(47, 43, 'G6'),
(48, 43, 'H7'),
(49, 44, 'G6'),
(50, 44, 'G7'),
(51, 45, 'G9'),
(52, 45, 'L11'),
(53, 46, 'G7'),
(54, 46, 'G8'),
(55, 47, 'H6'),
(56, 47, 'H7'),
(57, 47, 'H8');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `id_hoadon` int(11) NOT NULL,
  `id_account` int(11) NOT NULL,
  `id_phim` int(11) NOT NULL,
  `giochieu` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ngaychieu` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `tongtien` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`id_hoadon`, `id_account`, `id_phim`, `giochieu`, `ngaychieu`, `tongtien`) VALUES
(1, 1, 1, '11:00 AM', '12 tháng 04', 25.5),
(28, 7, 1, '11:00 AM', '12 tháng 04', 15),
(29, 7, 15, '11:00 AM', '12 tháng 04', 37.5),
(34, 7, 3, '11:00 AM', '12 tháng 04', 49),
(35, 7, 4, '11:00 AM', '12 tháng 04', 15),
(36, 7, 4, '11:00 AM', '12 tháng 04', 75),
(37, 7, 4, '11:00 AM', '12 tháng 04', 18.5),
(38, 7, 3, '12:00 AM', '12 tháng 04', 18.5),
(39, 7, 5, '12:00 AM', '14 tháng 04', 9),
(40, 0, 4, '11:00 AM', '06 tháng 05', 15),
(41, 1, 4, '11:00 AM', '07 tháng 05', 19),
(42, 1, 4, '11:00 AM', '07 tháng 05', 14),
(43, 1, 3, '11:00 AM', '07 tháng 05', 29.5),
(44, 1, 6, '12:00 AM', '10 tháng 05', 21.5),
(45, 1, 3, '11:00 AM', '10 tháng 05', 28.5),
(46, 9, 4, '11:00 AM', '15 tháng 05', 26),
(47, 9, 3, '11:00 AM', '15 tháng 05', 33.5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phim`
--

CREATE TABLE `phim` (
  `id_phim` int(11) NOT NULL,
  `ten_phim` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id_theloai` int(11) NOT NULL,
  `hinh_phim` longtext COLLATE utf8_unicode_ci NOT NULL,
  `banner_phim` text COLLATE utf8_unicode_ci NOT NULL,
  `thoiluong_phim` int(11) NOT NULL,
  `trailer_phim` text COLLATE utf8_unicode_ci NOT NULL,
  `mota` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phim`
--

INSERT INTO `phim` (`id_phim`, `ten_phim`, `id_theloai`, `hinh_phim`, `banner_phim`, `thoiluong_phim`, `trailer_phim`, `mota`) VALUES
(1, 'ALITA THIÊN THẦN CHIẾN BINH', 1, 'alita.jpg', 'alita.jpg', 130, 'U3D2vmWD88w', 'Tác phẩm live-action chuyển thể từ manga cùng tên của Yukito Kishiro. ALITA: BATTLE ANGEL (Thiên Thần Chiến Binh) hứa hẹn là một tác phẩm hành động viễn tưởng đỉnh cao qua bàn tay nhào nặn của những tên tuổi huyền thoại - James Cameron, Jon Landau và đạo diễn Robert Rodriguez. Phim lấy bối cảnh ở thế kỷ 26, xoay quanh nữ cyborg Alita do nữ diễn viên Rosa Salazar thủ vai. Cô bị bỏ rơi ở một bãi rác thải của Iron City và được cứu chữa bởi tiến sĩ Dyson Ido (Christoph Waltz thủ vai). Sau khi tỉnh dậy, cô không còn nhớ mình là ai và thế giới của cô đang sống như thế nào. Trong khi bác sĩ Ido ra sức che giấu quá khứ phức tạp của Alita thì người bạn mới là Hugo tìm cách giúp cô lấy lại ký ức. Alita dần phát hiện ra người cha nuôi của mình là một thợ săn tiền thưởng và sau đó, cô tham gia cùng với ông để tìm hiểu về quá khứ của mình. Cô dần phát hiện khả năng chiến đấu siêu phàm cũng như vai trò của cô giữa thế giới bị bao phủ bởi nhiều thế lực bóng tối.'),
(2, 'SINH NHẬT CHẾT CHÓC 2', 2, 'sinhnhat.jpg', '', 105, 'THq6KlWgiqw', 'Phần hậu truyện của bộ phim kinh dị từng gây sốt \"Sinh Nhật Chết Chóc\" về vòng lặp thời gian và tên sát nhân bí ẩn.'),
(3, 'BÍ KÍP LUYỆN RỒNG 3', 1, 'bikip.jpg', 'bikip.jpg', 110, 'naW9U8MiUY0', 'Sau khi Hiccup tạo ra một thế giới hòa bình cho loài rồng, Răng Sún phát hiện ra một người bạn mới đầy bí hiểm. Lúc này Hiccup đã trở thành người lãnh đạo của cả làng gánh trên vai trọng trách gìn giữ sự an nguy cho mọi người. Vì vậy, cậu không thể mãi bị cuốn theo những cuộc phiêu lưu bất tận với Răng Sún. Và khi nguy hiểm ập đến ngôi làng, cả Hiccup và Răng Sún đều đã đứng lên, anh dũng bảo vệ giống loài của mình.'),
(4, 'TÌNH ĐẦU THƠ NGÂY', 1, 'tinhdau.jpg', 'tinhdau.jpg', 95, 'L6paCtg4RxQ', 'Mỹ An (Lâm Thanh Mỹ) luôn thầm thương trộm nhớ anh chàng Thiên (Jsol) nam sinh khóa trên, giỏi toàn diện, đẹp trai, lại là con nhà giàu. Tuy được gắn mác “hoàng tử trong mộng” của các cô gái trong trường, nhưng Thiên tính tình lập dị, lạnh lùng, ít giao lưu với bạn bè cùng trang lứa và luôn mơ mộng trở thành siêu sao ca nhạc. Một ngày nọ, bố An phải đi công tác xa nên đành gửi gắm con gái ở nhờ nhà người bạn thân nhất, để rồi Thiên bỗng có thêm một cô bạn cùng nhà bất đắc dĩ. Biết được khao khát chiến thắng cuộc thi âm nhạc học đường và nỗi sợ bị người cha cấm cản theo đuổi âm nhạc của Thiên, Mỹ An đã động viên anh chàng đăng ký tham gia cuộc thi Be A Star. Cô hỗ trợ giúp Thiên tìm kiếm thành viên, thành lập ban nhạc đồng thời giúp anh giấu giếm cha mình mỗi lần đi tập luyện về muộn. Dần dà, Thiên cũng tìm được những người đồng đội ưng ý và chính thức trở thành đối thủ đáng gờm của Zero 9 trong cuộc thi.'),
(5, 'THE LEGO MOVIE 2', 1, 'lego.jpg', 'lego.jpg', 112, '11K013qpRR4', 'Trong The Lego Movie 2, thần dân xứ sở Lego lại phải đối diện với một kẻ thù khủng đến mức khiến cả Người dơi cũng bó tay chịu trói. Phim lấy bối cảnh ngày tận thế Lego sau khi thế giới bị một con quái vật tàn phá. Cuộc sống của người dân trở nên khó khăn và điêu đứng trừ Emmet (Chris Pratt). Anh chàng vẫn luôn lạc quan, yêu đời và chào hỏi mọi thành phần dù là đáng sợ nhất. Song, đây là lúc mối đe dọa mới từ không gian mang tên Lego Duplo xuất hiện và nhăm nhe hủy diệt mọi thứ. Dù được xem là anh hùng của phần phim trước nhưng chàng nam chính của chúng ta vẫn khá vô dụng và phải phụ thuộc vào Lucy (Elizabeth Banks) hay Batman (Will Arnett). Hậu quả là khi kẻ thù đòi giao nộp thủ lĩnh thì tất cả đều bị bắt đi trừ Emmet. Giờ đây, anh chàng buộc phải tự lực cánh sinh để cứu tất cả mọi người. The Lego Movie 2 vẫn sẽ theo phong cách hài bựa đặc trưng với những tình huống hết sức lầy lội cùng dàn nhân vật đông đảo tới từ vô số thương hiệu. Bộ phim sẽ là mang lại những trải nghiệm thú vị mùa Tết 2019 này.'),
(6, 'NỮ THẦN RẮN 2: NGOẠI TRUYỆN', 1, 'nuthan.jpg', 'nuthanran.jpg', 95, 'mSwLDw5xP58', 'Soi (Yaya Urassaya), cô gái trẻ sinh ra và lớn lên ở một ngôi làng phía Bắc của Thái Lan. Cô dành cả thanh xuân để coi sóc đền thờ nữ thần Nakee nhằm tỏ lòng tôn kính. Nhưng những vụ án chết người kì lạ liên tiếp xảy ra khiến dân làng cho rằng đấy là điềm báo sự trở lại của Nữ Thần Rắn. Đồng thời coi Soi chính là hiện thân của Nữ thần rắn đang quay về báo thù. Soi sẽ phải làm cách nào với những điềm báo này. Liệu cô và cảnh sát Pongprab (Nadech) có giúp dân làng thoát khỏi tai ương hay không? Liệu số phận của các nhân vật sẽ được Nakee định đoạt ra sao?'),
(7, 'TÂN VUA HÀI KỊCH', 1, 'tanvua.jpg', 'tanvua.jpg', 95, 'CewFQGIF6mA', 'Vì đam mê làm diễn viên, vì luôn tin tưởng rằng nếu không ngừng cố gắng thì mình sẽ thành công, Tiểu Mộng dù đã mất mười mấy năm làm diễn viên quần chúng, dù bạn bè người thân liên tục can ngăn, dù đạo diễn qùy lạy xin cô đừng đi đóng phim nữa, cô vẫn luôn kiên trì theo đuổi nghiệp diễn. Tuy nhiên, lòng kiên trì bền bỉ sắt đá đó không ngờ cũng có ngày lung lay khi Tiểu Mộng phát hiện bị bạn trai lừa gạt, cuỗm đi số tiền mà cô đã chắt chiu dành dụm suốt mười mấy năm làm quần chúng. Buồn bã và nản chí, Tiểu Mộng dần từ bỏ ước mơ của mình…'),
(8, 'ĐẠI ÚY MARVEL', 2, 'marvel.jpg', 'captainmarvel.jpg', 120, '0LHxvxdRnYc', 'Lấy bối cảnh những năm 90s, Captain Marvel là một cuộc phiêu lưu hoàn toàn mới đến với một thời kỳ chưa từng xuất hiện trong vũ trụ điện ảnh Marvel. Bộ phim kể về con đường trở thành siêu anh hùng mạnh mẽ nhất vũ trụ của Carol Danvers. Bên cạnh đó, trận chiến ảnh hưởng đến toàn vũ trụ giữa tộc Kree và tộc Skrull đã lan đến Trái Đất, liệu Danvers và các đồng minh có thể ngăn chặn binh đoàn Skrull cũng như các thảm họa tương lai?'),
(9, 'CÔNG VIÊN KỲ DIỆU', 2, 'congvien.jpg', '', 95, 'VML6rQWssSk', 'Một công viên lung linh, kỳ ảo được tạo nên bởi trí tưởng tượng vô tận của những đứa trẻ.'),
(10, 'POKÉMON: THÁM TỬ PIKACHU', 2, 'pikachu.jpg', '', 130, '1roy4o4tqQM', 'PokeMon: Detective Pikachu là phiên bản live-action (phiên bản có người đóng), dựa theo tựa game cùng tên đang \"làm mưa làm gió\" trong cộng đồng game thủ thế giới.'),
(11, 'CHÚNG TA (US)', 1, 'us.jpg', 'us.jpg', 136, 'hNCmb-4oXJA', 'Us, một tác phẩm đến từ hãng phim Monkeypaw, lấy bối cảnh tại một bờ biển mang tính biểu tượng phía Bắc California trong thời điểm hiện tại, với sự tham gia của các diễn viên như nữ diễn viên đạt giải Oscar Lupita Nyong’o với vai Adelaide Wilson, người đã trở lại căn nhà bên bờ biển mà cô sống thời ấu thơ cùng người chồng Gabe (ngôi sao Winston Duke của Black Panther) và hai người con (Shahadi Wright Joseph, Evan Alex) trong kì nghỉ hè. Bị ám ảnh bởi một chấn thương không thể giải thích trong quá khứ, kết hợp với một chuỗi các sự việc trùng hợp kỳ lạ, Adelaide cảm thấy sự hoang tưởng của bản thân đang tăng ở mức cảnh giác cao độ khi cô ngày càng chắc chắn rằng một điều gì đó tồi tệ sẽ xảy đến với gia đình mình. Sau một ngày vui chơi trên biển cùng một gia đình khác, nhà Tylers (nữ diễn viên thắng giải Emmy – Elisabeth Moss, Tim Heidecker, Cali Sheldon, Noelle Sheldon), Adelaide và gia đình cô chở về ngôi nhà của mình. Khi màn đêm buông xuống, nhà Wilsons bỗng thấy bóng của một gia đình 4 người đang nắm tay nhau đứng trên đường cao tốc. Us đẩy một gia đình Mỹ phải chống lại một đối thủ ghê rợn và kỳ lạ: những bản sao thực thể ma quái của chính họ.'),
(12, 'MẸ MA THAN KHÓC', 1, 'mema.jpg', 'mema.jpg', 104, 'uOV-xMYQ7sk', 'Một bom tấn từ ông hoàng phim kinh dị James Wan (The Conjuring, Annabelle, The Nun), bộ phim lấy bối cảnh năm 1973 tại Los Angeles, với nhân vật chính là Anna Garcia (Linda Cardellini đóng), một nhân viên công tác xã hội góa chồng đang nuôi nấng hai đứa con nhỏ. Khi tới điều tra vụ việc một bà mẹ bị buộc tội bạo hành trẻ em, Anna đã phát hiện ra những bí ẩn khó có thể giải thích trong vụ án này. Càng ngày, cô càng nhận ra sự trùng hợp ghê rợn giữa vụ việc của bà mẹ kia và những hiện tượng siêu nhiên xảy ra với chính gia đình mình, mà đứng đằng sau không ai khác chính là ác ma than khóc trong truyền thuyết La Llorona. Trước mối hiểm họa có thể ập đến hai người con của mình bất kỳ lúc nào, Anna buộc phải nhờ đến sự giúp đỡ của một thầy cúng địa phương để tống khứ bà mẹ ác quỷ về nơi mụ thuộc về.'),
(13, 'VUA SƯ TỬ', 2, 'lionking.jpg', '', 123, '4CbLXeGSDxg', 'Tác phẩm live-action từ phim hoạt hình kinh điển Vua Sử Tử 1994 của Disney.'),
(14, 'AVENGER: END GAME', 2, 'endgame.jpg', '', 180, 'TcMBFSGVi1c', 'Phần tiếp theo của Avenger: Infinity War'),
(15, 'HAI PHƯỢNG', 1, 'haiphuong.jpg', 'haiphuong.jpg', 100, 'eE7y7MUWfbk', 'Bộ phim là hành trình nghẹt thở và căng thẳng của bà mẹ đơn thân Hai Phượng (Ngô Thanh Vân) khi phải đối đầu với cả 1 đường dây tội phạm bắt cóc và buôn bán nội tạng xuyên quốc gia để cứu đứa con gái bé bỏng Mai (Mai Cát Vi). Để cứu được con, Hai Phượng chỉ có 14 tiếng đồng hồ rượt đuổi từ Cần Thơ, Sài Gòn cho đến Phan Thiết, và phải đối đầu với rất nhiều giang hồ cộm cán, sẵn sàng tiêu diệt ai dám cản đường chúng. Hành trình cứu con của Hai Phượng càng trở nên gian nan và khó khăn hơn khi bất kỳ một sơ xuất nhỏ nào cũng sẽ phải trả giá bằng chính mạng sống của chính cô và bé Mai.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `theloai`
--

CREATE TABLE `theloai` (
  `id_theloai` int(11) NOT NULL,
  `ten_theloai` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `hinh_theloai` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `theloai`
--

INSERT INTO `theloai` (`id_theloai`, `ten_theloai`, `hinh_theloai`) VALUES
(1, 'Phim đang chiếu', 'now-showing.png'),
(2, 'Phim sắp chiếu', 'coming-soon.png');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`);

--
-- Chỉ mục cho bảng `combo`
--
ALTER TABLE `combo`
  ADD PRIMARY KEY (`id_combo`);

--
-- Chỉ mục cho bảng `combodadat`
--
ALTER TABLE `combodadat`
  ADD PRIMARY KEY (`id_combodadat`);

--
-- Chỉ mục cho bảng `ghedadat`
--
ALTER TABLE `ghedadat`
  ADD PRIMARY KEY (`id_ghedadat`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`id_hoadon`);

--
-- Chỉ mục cho bảng `phim`
--
ALTER TABLE `phim`
  ADD PRIMARY KEY (`id_phim`);

--
-- Chỉ mục cho bảng `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`id_theloai`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `combo`
--
ALTER TABLE `combo`
  MODIFY `id_combo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `combodadat`
--
ALTER TABLE `combodadat`
  MODIFY `id_combodadat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `ghedadat`
--
ALTER TABLE `ghedadat`
  MODIFY `id_ghedadat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `id_hoadon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `phim`
--
ALTER TABLE `phim`
  MODIFY `id_phim` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `theloai`
--
ALTER TABLE `theloai`
  MODIFY `id_theloai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
