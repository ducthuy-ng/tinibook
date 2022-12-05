CREATE TABLE Book
(
    Id          VARCHAR(255)  CONSTRAINT BookPk PRIMARY KEY,
    ISBN            VARCHAR(50),
    Name        VARCHAR(150)    NOT NULL,
    Type        VARCHAR(50)     NOT NULL,
    Author          VARCHAR(50),
    CoverURL        VARCHAR(200),
    Publisher       VARCHAR(70),
    PagesNum        SMALLINT,
    Price           DECIMAL(10,2)   NOT NULL
);


INSERT INTO Book VALUES (1,9786045,'Thao túng tâm lý','Tâm lý','Trương Tuấn','https://salt.tikicdn.com/cache/w1200/ts/product/90/49/97/ec88ab408c1997378344486c94dbac40.jpg','Nhà Xuất Bản Dân Trí',328,110000);
INSERT INTO Book VALUES (2,3262827,'Yêu Được, Nắm Được, Thì Buông Được','Ngôn tình','Thuỷ An','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thanh Niên',358,91900);
INSERT INTO Book VALUES (3,5887300,'Nhà Phát Minh Ý Tưởng','Kinh tế','Chris Thomason','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Lao Động',276,40000);
INSERT INTO Book VALUES (4,5220315,'Đừng Cố Làm Người Tốt Trong Mắt Tất Cả Mọi Người','Tâm lý','Kim Yo Eun','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Đồng Nai',256,93400);
INSERT INTO Book VALUES (5,3004855,'Đánh Thức Con Người Phi Thường Trong Bạn (Tái Bản)','Tâm lý','Anthony Robbins','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Tổng hợp TP.HCM',250,131500);
INSERT INTO Book VALUES (6,5613545,'Cây Cam Ngọt Của Tôi','Tiểu thuyết','José Mảuo','https://bom.so/ujXJzu','Nhà Xuất Bản Hội Nhà Văn',244,73800);
INSERT INTO Book VALUES (7,3546411,'Trải Nghiệm Bán Lẻ Độc Đáo - Để Thu Hút Và Giữ Chân Khách Hàng Trong Thời Đại Số','Kinh doanh','Trần Thanh Phong','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',356,96500);
INSERT INTO Book VALUES (8,6423485,'Bí Quyết Thành Công Và Giàu Có Bằng Những Cửa Hàng Đông Khách','Kinh doanh','Trần Thanh Phong','Trần Thanh Phong','Nhà Xuất Bản Thế Giới',250,64000);
INSERT INTO Book VALUES (9,2556635,'Nhà Giả Kim','Tiểu thuyết',' Paulo Coelho','https://salt.tikicdn.com/cache/750x750/ts/product/45/3b/fc/aa81d0a534b45706ae1eee1e344e80d9.jpg.webp','Nhà Xuất Bản Hà Nội',228,54000);
INSERT INTO Book VALUES (10,2875577,'Một Thoáng Ta Rực Rỡ Ở Nhân Gian','Tiểu thuyết','Vương Quốc Vinh','https://salt.tikicdn.com/cache/750x750/ts/product/2f/b5/4e/a8208e9019c8510e8a8eebe06f50299c.jpg.webp','Nhà Xuất Bản Hội Nhà Văn',304,98500);
INSERT INTO Book VALUES (11,9149859,'Dám Bị Ghét','Tiểu thuyết','Koga Fumitake, Kishimi Ichiro','https://salt.tikicdn.com/cache/750x750/ts/product/74/11/ff/6304c47fec56e6f0b2110be65af0c7c2.jpg.webp','Nhã Nam',336,66000);
INSERT INTO Book VALUES (12,4898274,'Những Tù Nhân Của Địa Lý','Kiến Thức Tổng Hợp','Tim Marshall','https://salt.tikicdn.com/cache/750x750/ts/product/8d/96/9e/c0c1f23db756d50b1944dff9c3988753.jpg.webp','Nhà Xuất Bản Hội Nhà Văn',430,142800);
INSERT INTO Book VALUES (13,6866574,'Tiếng Núi','Tiểu thuyết','Kawabata Yasunari','https://salt.tikicdn.com/cache/750x750/ts/product/06/b0/b9/7ab33a63c472dddb0310a528119118b9.jpg.webp','Nhà Xuất Bản Hà Nội',384,176000);
INSERT INTO Book VALUES (14,7896005,'Bí Mật Của Thung Lũng Silicon','Kinh tế','Deborah Perry Piscione','https://sachweb.com/Upload/sach/bimatthunglungsilicon.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',359,165000);
INSERT INTO Book VALUES (15,1064669,'Kỳ lân công nghệ Giấc mơ, hiện thực','Kinh tế','Thẩm Hồng Thụy','https://sachweb.com/Upload/sach/kylanbia1.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',262,43200);
INSERT INTO Book VALUES (16,9834535,'Kẻ hủy diệt trong thế giới phẳng','Kinh tế','Thẩm Hồng Thụy','https://sachweb.com/Upload/sach/kehuydietbia1.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',253,43200);
INSERT INTO Book VALUES (17,3591504,'Doanh nhân Việt Nam trong lịch sử','Kinh tế','Trần Thuận','https://sachweb.com/Upload/sach/doanhnhanVN.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',261,62900);
INSERT INTO Book VALUES (18,8200181,'Các lựa chọn trong đầu tư vốn con người','Kinh tế','Bùi Chí Bình','https://sachweb.com/Upload/sach/cacluachondautuup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',97,97500);
INSERT INTO Book VALUES (19,7565283,'Kế toán chi phí','Kinh tế','Lê Ngọc Khánh','https://sachweb.com/Upload/sach/ketoanchiphiup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',128,71000);
INSERT INTO Book VALUES (20,8818344,'Để suy nghĩ mà không động não','Kinh tế','Eka Wartana','https://sachweb.com/Upload/sach/desuynghikodongnao.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',63,25500);
INSERT INTO Book VALUES (21,4634465,'Đừng bán bảo hiểm hãy trao giải pháp','Kinh tế','Pilot Nguyễn','https://sachweb.com/Upload/sach/dungbanbaohiem.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',146,35700);
INSERT INTO Book VALUES (22,9152053,'Phong cách quản trị Park Hang Seo','Kinh tế','Lê Huy Khoa Kanata','https://sachweb.com/Upload/sach/parkhangseoup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',229,25500);
INSERT INTO Book VALUES (23,2174031,'Sổ tay CEO - Quản trị "khủng bố" trực tuyến và xử lý khủng hoảng truyền thông hiệu quả','Kinh tế','Phan Minh Cường','https://sachweb.com/Upload/sach/Phong%20chong%20khung%20bo%20up.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',214,74000);
INSERT INTO Book VALUES (24,1600959,'Sổ tay CEO - Phòng chống gián điệp trong doanh nghiệp','Kinh tế','Phan Minh Cường - Võ Thế Chương','https://sachweb.com/Upload/sach/Phong%20chong%20gian%20diep%20doanh%20nghiep%20up.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',242,12000);
INSERT INTO Book VALUES (25,2983337,'Đi bán đam mê - Những câu chuyện khởi nghiệp','Kinh tế','Đỗ Quang Tuấn Hoàng','https://sachweb.com/Upload/sach/Di%20ban%20dam%20me%20finaup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',162,34000);
INSERT INTO Book VALUES (26,1076785,'Phòng chống vi phạm pháp luật về môi trường','Kinh tế','PGS.TS. Trương Thị Hiền','https://sachweb.com/Upload/sach/phongchongviphamphapluatup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',66,22100);
INSERT INTO Book VALUES (27,7362287,'Chuyển dịch cơ cấu kinh tế mô hình tăng trưởng kinh tế','Kinh tế','PGS.TS Lương Minh Cừ','https://sachweb.com/Upload/sach/chuyendichcocaukinhte.gif','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',294,30600);
INSERT INTO Book VALUES (28,1154632,'Kỷ yếu - Diễn đàn tư vấn quản trị 2012 ','Kinh tế','TS. Vũ Thế Dũng ','https://sachweb.com/Upload/sach/kyyeudiendantuvan.gif','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',142,85000);
INSERT INTO Book VALUES (29,7029827,'Kinh tế biển Việt Nam trên đường phát triển và hội nhập','Kinh tế','Ngô Lực Tải','https://sachweb.com/Upload/sach/kintebien2012.gif','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',51,31000);
INSERT INTO Book VALUES (30,8458358,'Phát triển công nghiệp ở các tỉnh, thành phố lớn Việt Nam','Kinh tế','Nhịp Cầu Việt','https://sachweb.com/Upload/sach/phatriencongnghiepthanhpholon.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',163,85000);
INSERT INTO Book VALUES (31,7645846,'Thỏa thuận hạn chế cạnh tranh trong hợp đồng nhượng quyền thương mại','Kinh tế','ThS Hằng Nga','https://sachweb.com/Upload/sach/thoathuancanhtranhtronghopdong210x260.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',254,68000);
INSERT INTO Book VALUES (32,3255241,'Những vấn đề cơ bản của các lý thuyết kinh tế','Kinh tế','TS Đinh Sơn Hùng - TS Trương Thị Hiền','https://sachweb.com/Upload/sach/nhungvandecobancualythuyetKT210x260.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',129,68000);
INSERT INTO Book VALUES (33,1400647,'DANH BẠ DOANH NGHIỆP VIỆT NAM XUẤT KHẨU TỚI MỸ','Kinh tế','Nhịp Cầu Việt','https://sachweb.com/Upload/sach/DanhbaDNVietNamXKsangHoaKyt210x260.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',279,85000);
INSERT INTO Book VALUES (34,6487858,'DANH BẠ DOANH NGHIỆP VIỆT NAM XUẤT KHẨU TỚI EU','Kinh tế','Nhịp Cầu Việt','https://sachweb.com/Upload/sach/DanhbaDNVietNamxuatkhausangEUt210x260.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',247,85000);
INSERT INTO Book VALUES (35,9161290,'Tư vấn quản lý: Một quan điểm mới','Kinh tế','Dr Koenraad Tommissen','https://sachweb.com/Upload/sach/tuvanquanlymotquandiemmoi210x260.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',120,60000);
INSERT INTO Book VALUES (36,4208889,'Đọc hiểu kinh tế học, quản trị kinh doanh, tài chính công ty, kế toán ngân hàng và tiếp thị','Kinh tế','Phan Văn Ba; Phan Xuân Thảo','https://sachweb.com/Upload/sach/dochieukinhtehoc210x260.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',81,81000);
INSERT INTO Book VALUES (37,4590696,'Ngôn ngữ và thân xác','Văn hóa xã hội','Nguyễn Văn Trung','https://sachweb.com/Upload/sach/catungthanxac.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',281,20400);
INSERT INTO Book VALUES (38,7389389,'Đảm bảo cơ hội học tập và giáo dục cho trẻ em nhập cư tại tp Hồ Chí Minh','Văn hóa xã hội','Ngô Minh Oanh','https://sachweb.com/Upload/sach/dambaocohoihoctap.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',240,72100);
INSERT INTO Book VALUES (39,1229655,'Những kỹ năng cơ bản trong cuộc sống','Văn hóa xã hội','Lê Huy Khoa Kanata','https://sachweb.com/Upload/sach/nhungkynangcoban.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',289,27200);
INSERT INTO Book VALUES (40,1156356,'Hán Việt thành ngữ cố sự','Văn hóa xã hội','Bác sĩ Hoàng Xuân Chỉnh','https://sachweb.com/Upload/sach/hanvietthanhcosu.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',175,33150);
INSERT INTO Book VALUES (41,8310204,'Gốm Nam Trung Bộ','Văn hóa xã hội','Nguyễn Đình Chúc - Trần Thanh Hưng','https://sachweb.com/Upload/sach/gomnamtrungbo.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',236,72250);
INSERT INTO Book VALUES (42,9439450,'Fake news và chống Fake news - Vì sao cái giả hấp dẫn hơn cái thật','Văn hóa xã hội','Đỗ Đình Tấn','https://sachweb.com/Upload/sach/Fakenews.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',252,93500);
INSERT INTO Book VALUES (43,8181861,'Đằng sau mặt báo ','Văn hóa xã hội','Trần Đình Ba','https://sachweb.com/Upload/sach/Dangsaumatbao.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',160,39950);
INSERT INTO Book VALUES (44,3736307,'Dĩ bất biến - Ứng vạn biến','Văn hóa xã hội','Lê Hưng VKD ','https://sachweb.com/Upload/sach/dibatbien.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',254,72250);
INSERT INTO Book VALUES (45,5413844,'Văn hóa người Việt vùng Tây Nam bộ','Văn hóa xã hội','Trường Đại học Khoa học Xã hội và Nhân văn','https://sachweb.com/Upload/sach/vanhoaviettay.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',127,29750);
INSERT INTO Book VALUES (46,3076327,'Những triết gia vĩ đại Socrate','Văn hóa xã hội','Karl Jaspers','https://sachweb.com/Upload/sach/nhungtrietgiavidaibiaup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',296,106250);
INSERT INTO Book VALUES (47,5818256,'Du lịch, du khảo trên Nam Kỳ tuần báo','Văn hóa xã hội','Võ Văn Thành, Trần Thành Trung','https://sachweb.com/Upload/sach/dlichdukhaoup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',123,29750);
INSERT INTO Book VALUES (48,9974493,'Hệ giá trị Việt Nam từ truyền thống đến hiện đại','Văn hóa xã hội','GS. TSKH. Trần Ngọc Thêm','https://sachweb.com/Upload/sach/hegiatriup.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',62,39950);
INSERT INTO Book VALUES (49,4257454,'Gia Định - Sài Gòn - Thành phố Hồ Chí Minh','Văn hóa xã hội','Nguyễn Đình Tư','https://sachweb.com/Upload/sach/saigongiaiinhbia1up.jpg','Nhà Xuất Bản Tổng Hợp Hồ Chí Minh',123,83300);

INSERT INTO Book VALUES (50,7850425,'Đại cương lịch sử Việt Nam - Tập 1','Lịch sử','Trương Hữu Quýnh','https://bom.so/ujXJzu','Công ty CP Sách Đại học - Dạy nghề',207,50000);
INSERT INTO Book VALUES (51,2779030,'I - Science 1 - Khoa học 1','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',172,153600);
INSERT INTO Book VALUES (52,3437702,'I - Science 1 (WorkBook) - Bài tập khoa học 1','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',192,185900);
INSERT INTO Book VALUES (53,6821889,'I - Science 2 - Khoa học 2','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',273,290700);
INSERT INTO Book VALUES (54,9898239,'I - Science 2 (WorkBook) - Bài tập Khoa học 2','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',152,222000);
INSERT INTO Book VALUES (55,9335476,'I - Science textBook 3 - Khoa học 3','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',183,168500);
INSERT INTO Book VALUES (56,4293222,'I - Science 3 (WorkBook A) - Bài tập Khoa học 3A','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',157,244000);
INSERT INTO Book VALUES (57,6297794,'I - Science 3 (WorkBook B) - Bài tập Khoa học 3B','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',209,165400);
INSERT INTO Book VALUES (58,8630108,'I - Science 4 - Khoa học 4','Khoa học','Khee Boone','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',297,283800);
INSERT INTO Book VALUES (59,7425912,'I - Science 4 (workBook A) - Bài tập khoa học 4A','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',289,84100);
INSERT INTO Book VALUES (60,7667591,'I - Science 4 (workBook B) - Bài tập khoa học 4B','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',193,138100);
INSERT INTO Book VALUES (61,3925948,'I - Science textBook 5 - Khoa học 5','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',215,129500);
INSERT INTO Book VALUES (62,9842645,'I - Science WorkBook 5A - Bài tập Khoa học 5A','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',295,79300);
INSERT INTO Book VALUES (63,8098131,'I - Science WorkBook 5B - Bài tập khoa học 5B','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',225,142700);
INSERT INTO Book VALUES (64,4069816,'I - Science TextBook 6 - Khoa học 6','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',269,15470);
INSERT INTO Book VALUES (65,9305461,'I - Science workBook 6A - Bài tập Khoa học 6A','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',269,60800);
INSERT INTO Book VALUES (66,3624783,'I - Science workBook 6B - Bài tập Khoa học 6B','Khoa học',' Ho Peck Leng, Tho Lai Hoong','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',238,229400);
INSERT INTO Book VALUES (67,6578992,'Hoạt động trải nghiệm với STEAM Dành cho học sinh Trung học cơ sở','Khoa học','Trần Ngọc Chất, An Biên Thuỳ','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',205,120900);
INSERT INTO Book VALUES (68,5221512,'Hoạt động trải nghiệm với STEAM lớp 9','Khoa học','Trần Ngọc Chất, An Biên Thuỳ','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',272,89800);
INSERT INTO Book VALUES (69,3549356,'Hoạt động giáo dục STEM lớp 10','Khoa học','Trần Ngọc Chất, An Biên Thuỳ','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',283,265100);
INSERT INTO Book VALUES (70,5503932,'Hoạt động giáo dục STEM lớp 11','Khoa học','Trần Ngọc Chất, An Biên Thuỳ','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',128,206500);
INSERT INTO Book VALUES (71,5261252,'Hoạt động trải nghiệm với STEAM lớp 8','Khoa học','Trần Ngọc Chất, An Biên Thuỳ','https://bom.so/ujXJzu','Công ty CP Đầu tư và Phát triển giáo dục Hà Nội',228,184000);
INSERT INTO Book VALUES (72,8750297,'Hiểu Hết Về Kinh Doanh','Kiến thức - Bách khoa','https://bom.so/ujXJzu','https://bom.so/ujXJzu','https://bom.so/ujXJzu',218,214400);
INSERT INTO Book VALUES (73,8839392,'Lịch sử bóng đá bằng tranh - Ngôi đền huyền thoại','Kiến thức - Bách khoa','David Squires','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',284,282200);
INSERT INTO Book VALUES (74,8228328,'Bản Đồ','Kiến thức - Bách khoa',' Aleksandra Mizielińska','https://bom.so/ujXJzu','Nhà Xuất Bản Lao Động',190,180700);
INSERT INTO Book VALUES (75,3286302,'Lịch Sử Thế Giới ','Kiến thức - Bách khoa',' Pascale Bouchié','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',276,157200);
INSERT INTO Book VALUES (76,9242112,'Tớ Học Lập Trình - Làm Quen Với Python','Kiến thức - Bách khoa',' Louie Stowell','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',294,272200);
INSERT INTO Book VALUES (77,3973005,'Các nhân vật nổi tiếng trong lịch sử qua truyện tranh','Kiến thức - Bách khoa','Sophie Crépon','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',114,192700);
INSERT INTO Book VALUES (78,2387596,'Lịch sử bóng đá','Kiến thức - Bách khoa','David Squires','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',107,103600);
INSERT INTO Book VALUES (79,1940656,'Gi Gỉ Gì Gi, Cái Gì Cũng Biết ','Kiến thức - Bách khoa','Hanazono Makoto','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',286,239500);
INSERT INTO Book VALUES (80,2790415,'Bách Khoa Thư Tiểu Học Larousse- Thiên Nhiên','Kiến thức - Bách khoa','Larousse','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',153,279000);
INSERT INTO Book VALUES (81,1671974,'Hỏi Đáp Cùng Em - Vì Sao','Kiến thức - Bách khoa','Isabelle Fougère','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',188,160600);
INSERT INTO Book VALUES (82,3087826,'Cuốn Sách Tài Chính Đầu Đời','Kiến thức - Bách khoa','Walter Andal','https://bom.so/ujXJzu','Nhã Nam',120,172400);
INSERT INTO Book VALUES (83,5604506,'Never Get Bored - Tí Ta Tí Toáy','Kiến thức - Bách khoa','Nhiều tác giả','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',173,73100);
INSERT INTO Book VALUES (84,5967242,'Lịch Sử Chế Tạo Máy Bay','Kiến thức - Bách khoa','Nhiều tác giả','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',134,73100);
INSERT INTO Book VALUES (85,1730046,'Người Máy Có Mơ Về Cừu Điện Không?','Kiến thức - Bách khoa','Philip K. Dick','https://bom.so/ujXJzu','Nhà Xuất Bản Văn Học',217,73100);
INSERT INTO Book VALUES (86,1701802,'Sách Lật Tương Tác Song Ngữ','Kiến thức - Bách khoa','Giuliano Ferri','https://bom.so/ujXJzu','Nhà Xuất Bản Hà Nội',176,233800);
INSERT INTO Book VALUES (87,2336902,'Phát Triển Trí Tuệ Cảm Xúc- Chúng Mình Tôn Trọng Cơ Thể Và Cảm Xúc Của Nhau','Kiến thức - Bách khoa','Jayneen Sanders','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',140,209900);
INSERT INTO Book VALUES (88,5353097,'Mọi Điều Em Cần Biết Trước Ngày Đi Mẫu Giáo','Kiến thức - Bách khoa','Felicity Brooks, Rosalinde Bonnet','https://bom.so/ujXJzu','Nhã Nam',145,115400);
INSERT INTO Book VALUES (89,4665268,'Lịch Sử Chế Tạo Xe Hơi','Kiến thức - Bách khoa',' Nhiều tác giả','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',110,87400);
INSERT INTO Book VALUES (90,1080584,'ƯƠM MẦM GIỎI TOÁN TỪ TIỂU HỌC - Tiểu học 5','Kiến thức - Bách khoa','Park Young Hoon, Wuji House','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',255,183300);
INSERT INTO Book VALUES (91,1778092,'Học Toán Qua Truyện Ngụ Ngôn - Cáo Già Và Mèo Rừng','Kiến thức - Bách khoa','Nguyễn Văn Tùng','https://bom.so/ujXJzu','Nhã Nam',192,61000);
INSERT INTO Book VALUES (92,3323774,'Những Khám Phá Đầu Tiên Của Tớ: Mèo','Kiến thức - Bách khoa','Henri Galeron','https://bom.so/ujXJzu','Nhã Nam',168,187100);
INSERT INTO Book VALUES (93,5435865,'Never Get Bored - Tí Ta Tí Toáy Ngoài Trời','Kiến thức - Bách khoa','Nhiều tác giả','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',195,65300);
INSERT INTO Book VALUES (94,4824718,'Những Khám Phá Đầu Tiên Của Tớ: Tàu Thuyền','Kiến thức - Bách khoa','Christian Broutin','https://bom.so/ujXJzu','Nhã Nam',150,138400);
INSERT INTO Book VALUES (95,5393817,'Gấu Kaola - Làn Hơi Ấm','Kiến thức - Bách khoa','Rury Lee & Emanuele Bertossi','https://bom.so/ujXJzu','Nhã Nam',153,168500);
INSERT INTO Book VALUES (96,6773158,'Bộ Sách An Toàn Cho Con Yêu - Bí Mật Rất Cần Bí Mật','Kiến thức - Bách khoa','Jayneen Sanders','https://bom.so/ujXJzu','Nhà Xuất Bản Hội Nhà Văn',287,150600);
INSERT INTO Book VALUES (97,7133623,'Phát Triển Trí Tuệ Cảm Xúc - Con Được Là Chính Mình!','Kiến thức - Bách khoa','Jayneen Sanders','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',279,194900);
INSERT INTO Book VALUES (98,1250804,'Phát Triển Trí Tuệ Cảm Xúc - Gấu Ơi, Con Lo Lắng Đến Chừng Nào?','Kiến thức - Bách khoa',' Jayneen Sanders','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',261,108000);
INSERT INTO Book VALUES (99,6904233,'Phát Triển Trí Tuệ Cảm Xúc- Sự Tử Tế Đẹp Như Bông Hoa','Kiến thức - Bách khoa','Jayneen Sanders','https://bom.so/ujXJzu','Nhà Xuất Bản Dân Trí',235,199400);
--100
INSERT INTO Book VALUES (100,1000041,'Cũng Là “Tiếng Em” Mà Lạ Lắm','Sách tư duy - Kỹ năng sống',' Khotudien','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg?fbclid=IwAR2a4w2zKvqyG8uH7GJE-N1ZPVQGJa0ZKSKb18XRzu3UlqIOGsPOUd9jIiY','Nhà Xuất Bản Phụ Nữ Việt Nam',280,65500);
INSERT INTO Book VALUES (101,1840458,'Từ Điển Tiếng “Em"','Truyện ngắn - Tản Văn','Cẩm Anh','https://bom.so/H77R6e','NXB Lao Động',250,206300);
INSERT INTO Book VALUES (102,8337026,'Những Đêm Không Ngủ Những Ngày Chậm Trôi','Truyện ngắn - Tản Văn','An Nhiên','https://bom.so/H77R6e','NXB Lao Động',326,75300);
INSERT INTO Book VALUES (103,1974953,'Chuyện Kể Rằng Có Nàng Và Tôi','Truyện ngắn - Tản Văn','Phương Linh','https://bom.so/H77R6e','NXB Lao Động',295,62500);
INSERT INTO Book VALUES (104,8264316,'Mình Ngồi Xuống Kể Tổn Thương Trong Lòng','Truyện ngắn - Tản Văn','Thiên Bình','https://bom.so/H77R6e','NXB Hà Nội',350,206900);
INSERT INTO Book VALUES (105,9786075,'Có Một Ngày, Bố Mẹ Sẽ Già Đi','Truyện ngắn - Tản Văn','Hoài Thương','https://bom.so/H77R6e','Nhà Xuất Bản Phụ Nữ Việt Nam',131,202300);
INSERT INTO Book VALUES (106,7384561,'Vui Vẻ Không Quạu Nha','Truyện ngắn - Tản Văn','An Ngọc','https://bom.so/ujXJzu','NXB Lao Động',304,168000);
INSERT INTO Book VALUES (107,2335142,'Vui Vẻ Không Quạu Nha 2 - Một Cuốn Sách Buồn… Cười','Truyện ngắn - Tản Văn','Khánh Châu','https://bom.so/H77R6e','NXB Hà Nội',202,99600);
INSERT INTO Book VALUES (108,5373048,'Tâm An Ắt Bình An','Truyện ngắn - Tản Văn','Thanh Thúy','https://bom.so/H77R6e','Nhà Xuất Bản Phụ Nữ Việt Nam',399,61000);
INSERT INTO Book VALUES (109,3385161,'Màu Nhạt Nắng','Truyện ngắn - Tản Văn','Bích Hà','https://bom.so/H77R6e','NXB Hà Nội',236,130400);
INSERT INTO Book VALUES (110,1208986,'Dear, Darling','Truyện ngắn - Tản Văn','Thanh Hà','https://bom.so/H77R6e','Nhà Xuất Bản Phụ Nữ Việt Nam',224,149500);
INSERT INTO Book VALUES (111,1051848,'Chúng Ta Rồi Sẽ Hạnh Phúc, Theo Những Cách Khác Nhau','Truyện ngắn - Tản Văn','Thanh Thảo','https://bom.so/H77R6e','NXB Hà Nội',325,189900);
INSERT INTO Book VALUES (112,2066878,'Gửi Bạn, Người Đã Kiệt Sức Vì Những Chịu Đựng Âm Thầm','Truyện ngắn - Tản Văn','Hiền Châu','https://bom.so/H77R6e','NXB Hà Nội',140,127000);
INSERT INTO Book VALUES (113,8711236,'Chuyện ICU - Khi Thiên Thần Nhiễm Bệnh','Truyện ngắn - Tản Văn','Phúc An','https://bom.so/H77R6e','NXB Hà Nội',317,218300);
INSERT INTO Book VALUES (114,3848712,'Hai Mặt Của Gia Đình','Truyện ngắn - Tản Văn','Khánh Ngân','https://bom.so/H77R6e','NXB Hà Nội',270,82600);
INSERT INTO Book VALUES (115,6572642,'Phụ Nữ Hiểu Biết Sẽ Có Cuộc Sống Đẳng Cấp Hơn','Truyện ngắn - Tản Văn','Ngọc Khuê','https://bom.so/H77R6e','NXB Trẻ',146,68700);
INSERT INTO Book VALUES (116,5102054,'Drama Nuôi Tôi Lớn Loài Người Dạy Tôi Khôn','Truyện ngắn - Tản Văn','Robin Sharma, Phạm Anh Tuấn','https://bom.so/H77R6e','NXB Trẻ',133,169600);
INSERT INTO Book VALUES (117,5633590,'Điều Vĩ Đại Đời Thường','Truyện ngắn - Tản Văn','Robin Sharma','https://bom.so/H77R6e','NXB Trẻ',200,104700);
INSERT INTO Book VALUES (118,8321072,'Đừng Nhạt Nữa','Truyện ngắn - Tản Văn','Khả Hân','https://bom.so/H77R6e','NXB Trẻ',188,77800);
INSERT INTO Book VALUES (119,4776004,'Thế Giới Này Âm Thầm Yêu Em','Truyện ngắn - Tản Văn','Hoài An','https://bom.so/H77R6e','NXB Hà Nội',352,179300);
INSERT INTO Book VALUES (120,3872520,'Vô Thường','Truyện ngắn - Tản Văn','Nguyễn Bảo Trung','https://bom.so/H77R6e','NXB Hà Nội',136,104600);
INSERT INTO Book VALUES (121,4316624,'Điều Vĩ Đại Đời Thường','Truyện ngắn - Tản Văn','Robin Sharma','https://bom.so/H77R6e','NXB Hà Nội',326,156500);
INSERT INTO Book VALUES (122,6823382,'Đời Có Mấy Tý, Sao Phải Nghĩ','Truyện ngắn - Tản Văn','Robin Sharma','https://bom.so/H77R6e','NXB Trẻ',194,139700);
INSERT INTO Book VALUES (123,5745502,'Chúng Ta Là Những Đứa Trẻ Cô Đơn','Truyện ngắn - Tản Văn','Gia Hân','https://bom.so/H77R6e','NXB Trẻ',315,250900);
INSERT INTO Book VALUES (124,6986499,'Truyện Ngắn Nam Cao','Truyện ngắn - Tản Văn','Cát Tường','https://bom.so/H77R6e','NXB Trẻ',304,99600);
INSERT INTO Book VALUES (125,2290750,'ĐÀM ĐẠO VỚI KHỔNG TỬ','Triết Học','Hồ Văn Phi','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Văn Học',269,188600);
INSERT INTO Book VALUES (126,3653728,'TƯ DUY NGƯỢC','Triết Học','Nguyễn Anh Dũng','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','NXB Dân Trí',196,207000);
INSERT INTO Book VALUES (127,2324794,'Thuyết Khắc Kỷ','Triết Học','John Sellars','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',317,240600);
INSERT INTO Book VALUES (128,6435526,'HIỂU NGƯỜI để DÙNG NGƯỜI','Triết Học','Nguyễn Kim Hanh','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',386,78100);
INSERT INTO Book VALUES (129,9747295,'TRÍ TUỆ của NGƯỜI XƯA','Triết Học','Nguyễn Kim Hanh','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',316,254100);
INSERT INTO Book VALUES (130,7245879,'Lược Sử Triết Học','Triết Học','Nigel Warburton','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',237,242900);
INSERT INTO Book VALUES (131,5033995,'How Philosophy Works - Hiểu Hết Về Triết Học','Triết Học','DK','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',353,75900);
INSERT INTO Book VALUES (132,7468453,'Zarathustra Đã Nói Như Thế','Triết Học','Friedrich Nietzsche','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Dân Trí',300,99300);
INSERT INTO Book VALUES (133,9369927,'ĐẠO LÝ NGƯỜI XƯA','Triết Học','Nguyễn Kim Hanh','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',283,244800);
INSERT INTO Book VALUES (134,6229722,'Năng Lực Tinh Thần','Triết Học','Henri Bergson','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',230,147600);
INSERT INTO Book VALUES (135,8828507,'Lược Sử Vật Lý Lượng Tử','Kiến Thức Tổng Hợp','Tào Thiên Nguyên','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thanh Niên',319,154800);
INSERT INTO Book VALUES (136,7952356,'Einstein - Cuộc Đời Và Vũ Trụ','Kiến Thức Tổng Hợp','Walter Isaacson','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',367,124800);
INSERT INTO Book VALUES (137,4502184,'Thần Với Chả Thoại','Kiến Thức Tổng Hợp','Fanpage Thần với chả Thoại','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Dân Trí',205,249600);
INSERT INTO Book VALUES (138,5296781,'Những Tù Nhân Của Địa Lý','Kiến Thức Tổng Hợp','Tim Marshall','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',215,85200);
INSERT INTO Book VALUES (139,9225547,'Luật Tâm Thức - Giải Mã Ma Trận Vũ Trụ','Kiến Thức Tổng Hợp','Ngô Sa Thạch','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',130,232400);
INSERT INTO Book VALUES (140,4189996,'Sổ Tay Nhà Thôi Miên','Kiến Thức Tổng Hợp','Cao Minh','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',416,194700);
INSERT INTO Book VALUES (141,8399113,'https://bom.so/ujXJzu','Kiến Thức Tổng Hợp','Cao Minh','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',279,145000);
INSERT INTO Book VALUES (142,7421098,'Thế Giới Cà Phê Đỉnh Cao','Kiến Thức Tổng Hợp','Steven Macatonia','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',276,213500);
INSERT INTO Book VALUES (143,7806478,'Năng Đoạn Kim Cương','Kiến Thức Tổng Hợp','nhieu tac gia','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',323,183400);
INSERT INTO Book VALUES (144,6299193,'Bán Hàng Bằng Trái Tim','Kinh Tế','Shari Levitin','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',174,213100);
INSERT INTO Book VALUES (145,2231603,'Hễ Nói Là Thắng','Kinh Tế','Instant Research Institude','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',226,158000);
INSERT INTO Book VALUES (146,8209055,'Khéo Nói Hay Để Khách Hàng Mua Ngay','Kinh Tế','Lục Bằng','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',207,226700);
INSERT INTO Book VALUES (147,4849954,'Nghệ Thuật Đánh Cắp Ý Tưởng','Kinh Tế','Austin Kleon','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',182,128900);
INSERT INTO Book VALUES (148,2271539,'Lập Kế Hoạch Công Việc Theo Chu Trình PDCA','Kinh Tế','Yoshiki Nakazuka','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Hội Nhà Văn',284,142000);
INSERT INTO Book VALUES (149,2311234,'MBA Căn Bản','Kinh Tế','Waseda Business School','https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/Book/lrg/9780/8037/9780803741713.jpg','Nhà Xuất Bản Thế Giới',332,167600);

-- 150

INSERT INTO Book VALUES (150,5612314,'Tâm Lý Học Mối Quan Hệ','Tâm lý','Choi Kwanghyun','https://bom.so/ujXJzu','Nhà Xuất Bản Thanh Niên',280,71000);
INSERT INTO Book VALUES (151,7123546,'Ám Ảnh Sợ Xã Hội - Chạy Trốn Hay Đối Mặt','Tư duy - Kỹ năng sống','Lý Thế Cường','https://bom.so/ujXJzu','Nhà Xuất Bản Thanh Niên',304,89900);
INSERT INTO Book VALUES (152,8413456,'Ổn Định Hay Tự Do','Tư duy - Kỹ năng sống','Trương Học Vĩ','https://bom.so/ujXJzu','	Nhà Xuất Bản Văn Học',284,94100);
INSERT INTO Book VALUES (153,8794502,'Tâm Lý Học Hành Vi','Tư duy - Kỹ năng sống','Khương Nguy','https://bom.so/ujXJzu','Nhà Xuất Bản Hà Nội',276,73400);
INSERT INTO Book VALUES (154,4564585,'Đừng Cố Làm Người Tốt Trong Mắt Tất Cả Mọi Người','Tư duy - Kỹ năng sống','Kim Yo Eun','https://bom.so/ujXJzu','Nhà Xuất Bản Đồng Nai',256,93000);
INSERT INTO Book VALUES (155,9545351,'Rèn Luyện Tư Duy Phản Biện','Tư duy - Kỹ năng sống','Albert Rutherford','https://bom.so/ujXJzu','Nhà Xuất Bản Phụ Nữ',204,59000);
INSERT INTO Book VALUES (156,8546512,'Tuổi Trẻ Đáng Giá Bao Nhiêu','Tư duy - Kỹ năng sống','Rosie Nguyễn','https://bom.so/ujXJzu','Nhà Xuất Bản Hội Nhà Văn',291,61200);
INSERT INTO Book VALUES (157,3215443,'Đừng Lựa Chọn An Nhàn Khi Còn Trẻ','Tư duy - Kỹ năng sống','Cảnh Thiên','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',316,68000);
INSERT INTO Book VALUES (158,5486214,'Trời Sinh Vụng Về, Hãy Bù Đắp Bằng Sự Kiên Trì','Tư duy - Kỹ năng sống','Lư Tư Hạo','https://bom.so/ujXJzu','Nhà Xuất Bản Phụ Nữ Việt Nam',368,92400);
INSERT INTO Book VALUES (159,4562143,'Tôi Không Thích Ồn Ào','Tư duy - Kỹ năng sống','Ashley Davis Bush','https://bom.so/ujXJzu','Nhà Xuất Bản Hà Nội',136,57000);
INSERT INTO Book VALUES (160,7313015,'100+ Bài Tập Kích Thích Não Bộ Hiệu Quả 40 Ngày Luyện Trí Nhớ','Tư duy - Kỹ năng sống','Dr. Gareth Moore','https://bom.so/ujXJzu','Nhà Xuất Bản Thế Giới',208,77400);
INSERT INTO Book VALUES (161,4648941,'Lựa chọn trong tỉnh thức','Tư duy - Kỹ năng sống','Tinh Vân','https://bom.so/ujXJzu','Nhà Xuất Bản Lao Động',310,146000);
INSERT INTO Book VALUES (162,4562314,'Lịch Pháp Và Những Ngày Tốt Trong Năm 2021 - 2030','Tư duy - Kỹ năng sống','Tuệ Chân - Lê Tiến Thành','https://bom.so/ujXJzu','NXB Hồng Đức',359,132000);
INSERT INTO Book VALUES (163,4310435,'Dám Bị Ghét','Tư duy - Kỹ năng sống','Koga Fumitake, Kishimi Ichiro','https://bom.so/ujXJzu','Nhã Nam',336,71200);
INSERT INTO Book VALUES (164,5784654,'Những Giấc Mơ Ở Hiệu Sách Morisaki','Tiểu thuyết','Yagisawa Satoshi','https://bom.so/ujXJzu','Nhã Nam',118,62000);
INSERT INTO Book VALUES (165,8975413,'Tấm mạng hoa','Tiểu thuyết','W. Somerset Maugham','https://bom.so/ujXJzu','Nhà Xuất Bản Đại Học Quốc Gia Hà Nội',416,164500);
INSERT INTO Book VALUES (166,1567984,'Làm sao dừng lại thời gian','Tiểu thuyết','Matt Haig','https://bom.so/ujXJzu','Nhà Xuất Bản Thông Tấn',460,143000);
INSERT INTO Book VALUES (167,0534587,'Bách hóa giấc mơ của ngài Dollargut','Tiểu thuyết','Lee Miye','https://bom.so/ujXJzu','Nhà Xuất Bản Hà Nội',200,97600);
INSERT INTO Book VALUES (168,4564214,'Cô Gái Trong Trang Sách','Tiểu thuyết','Guillaume Musso','https://bom.so/ujXJzu','Nhã Nam',506,114000);
INSERT INTO Book VALUES (169,1544858,'Mặt Trời Trong Suối Lạnh','Tiểu thuyết','Nguyễn Phương Văn','https://bom.so/ujXJzu','Nhà Xuất Bản Phụ Nữ Việt Nam',160,83000);
INSERT INTO Book VALUES (170,4578945,'Doraemon Truyện ngắn tập 1','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',96,18000);
INSERT INTO Book VALUES (171,9840544,'Doraemon Truyện ngắn tập 2','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',100,18000);
INSERT INTO Book VALUES (172,9564244,'Doraemon Truyện ngắn tập 3','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',89,18000);
INSERT INTO Book VALUES (173,0546484,'Doraemon Truyện ngắn tập 4','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',99,18000);
INSERT INTO Book VALUES (174,6486414,'Doraemon Truyện ngắn tập 5','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',90,18000);
INSERT INTO Book VALUES (175,9854264,'Doraemon Truyện ngắn tập 6','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',96,18000);
INSERT INTO Book VALUES (176,4546548,'Doraemon Truyện ngắn tập 7','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',91,18000);
INSERT INTO Book VALUES (177,4556315,'Doraemon Truyện ngắn tập 8','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',92,18000);
INSERT INTO Book VALUES (178,4532002,'Doraemon Truyện ngắn tập 9 ','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',89,18000);
INSERT INTO Book VALUES (179,4315464,'Doraemon Truyện ngắn tập 10','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',87,18000);
INSERT INTO Book VALUES (180,4564828,'Doraemon Truyện ngắn tập 11','Truyện tranh','Fujiko F Fujio','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',101,18000);
INSERT INTO Book VALUES (181,5648483,'Thám Tử Lừng Danh Conan - Tập 1','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',184,20000);
INSERT INTO Book VALUES (182,8845345,'Thám Tử Lừng Danh Conan - Tập 2','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',186,20000);
INSERT INTO Book VALUES (183,4612348,'Thám Tử Lừng Danh Conan - Tập 3','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',188,20000);
INSERT INTO Book VALUES (184,1985454,'Thám Tử Lừng Danh Conan - Tập 4','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',180,20000);
INSERT INTO Book VALUES (185,9845612,'Thám Tử Lừng Danh Conan - Tập 5','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',185,20000);
INSERT INTO Book VALUES (186,9451255,'Thám Tử Lừng Danh Conan - Tập 6','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',184,20000);
INSERT INTO Book VALUES (187,1635643,'Thám Tử Lừng Danh Conan - Tập 7','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',173,20000);
INSERT INTO Book VALUES (188,4484642,'Thám Tử Lừng Danh Conan - Tập 8','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',189,20000);
INSERT INTO Book VALUES (189,4315465,'Thám Tử Lừng Danh Conan - Tập 9','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',181,20000);
INSERT INTO Book VALUES (190,9541241,'Thám Tử Lừng Danh Conan - Tập 11','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',181,20000);
INSERT INTO Book VALUES (191,1345122,'Thám Tử Lừng Danh Conan - Tập 12','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',183,20000);
INSERT INTO Book VALUES (192,0345685,'Thám Tử Lừng Danh Conan - Tập 13','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',184,20000);
INSERT INTO Book VALUES (193,4864615,'Thám Tử Lừng Danh Conan - Tập 14','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',187,20000);
INSERT INTO Book VALUES (194,8945574,'Thám Tử Lừng Danh Conan - Tập 15','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',179,20000);
INSERT INTO Book VALUES (195,3446124,'Thám Tử Lừng Danh Conan - Tập 16','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',177,20000);
INSERT INTO Book VALUES (196,4981462,'Thám Tử Lừng Danh Conan - Tập 17','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',187,20000);
INSERT INTO Book VALUES (197,3215461,'Thám Tử Lừng Danh Conan - Tập 18','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',185,20000);
INSERT INTO Book VALUES (198,9615437,'Thám Tử Lừng Danh Conan - Tập 19','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',186,20000);
INSERT INTO Book VALUES (199,1461843,'Thám Tử Lừng Danh Conan - Tập 20','Truyện tranh','Gosho Aoyama','https://bom.so/ujXJzu','Nhà Xuất Bản Kim Đồng',189,20000);
