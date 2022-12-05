CREATE TYPE Building_type AS ENUM ('SHOP', 'WAREHOUSE');

CREATE TABLE Building
(
    BuildingId   varchar(255)
        CONSTRAINT BuildingPk PRIMARY KEY,
    Name        VARCHAR(255),
    Address      VARCHAR(255),
    BuildingType Building_type
);

INSERT INTO Building
VALUES ('1', 'SHOP 1', 'Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương', 'SHOP'),
       ('2', 'KHO 1', '268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM', 'WAREHOUSE'),
       ('3', 'KHO 2', '1 Võ Văn Ngân, P. Linh Chiểu, Quận Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam', 'WAREHOUSE');