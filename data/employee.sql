CREATE TYPE Bookstore_role AS ENUM ('SHOP_MANAGER', 'STORAGE_MANAGER', 'ACCOUNTANT',  'STAFF');

CREATE TABLE Employee (
    EmployeeID          INT CONSTRAINT EmployeePk PRIMARY KEY,
    EmployeeName        VARCHAR(255),
    SSN                 VARCHAR(255),
    Email               VARCHAR(255),
    Phone             VARCHAR(255),
    Username            VARCHAR(255),
    Password            VARCHAR(255),
    assigned_building   VARCHAR(255)
);

CREATE TABLE Employee_Occupation (
    EID             INT,
    Occupation      Bookstore_role,
    CONSTRAINT Occupation_Pk PRIMARY KEY (Occupation, EID)
);

-- 20 Employees --
INSERT INTO Employee (EmployeeID, EmployeeName, SSN, Email, Phone, Username, Password, assigned_building) VALUES
(001, 'Nguyen Duc Thuy',    '079200010204', 'nguyenducthuy@gmail.com',      '0355749744', 'nguyenducthuy',      'tinibook',     '2'),
(002, 'Phan Thi Quynh Nhu', '079200010205', 'phanthiquynhnhu@gmail.com',    '0355890765', 'phanthiquynhnhu',    'tinibook',     '1'),
(003, 'Ho Truong Duc Tien', '079200010303', 'hotruongductien@gmail.com',    '0355749744', 'hotruongductien',    'tinibook',     '2'),
(004, 'Truong Huy Thai',    '079200010403', 'truonghuythai@gmail.com',      '0767749744', 'truonghuythai',      'tinibook',     '2'),
(005, 'Tran Van A',         '079200010503', 'tranvana@gmail.com',           '0982749744', 'tranvana',           'tinibook',     '2'),
(006, 'Nguyen Thi B',       '079200020203', 'nguyenhthib@gmail.com',        '0977749744', 'nguyenhthib',        'tinibook',     '2'),
(007, 'Tran Van C',         '079200030203', 'tranvanc@gmail.com',           '0355749744', 'tranvanc',           'tinibook',     '3'),
(008, 'Nguyen Ngoc D',      '079200040203', 'nguyenngocd@gmail.com',        '0355749744', 'nguyenngocd',        'tinibook',     '3'),
(009, 'Nguyen Van E',       '079200050203', 'nguyenvane@gmail.com',         '0355749744', 'nguyenvane',         'tinibook',     '3'),
(010, 'Do Thi G',           '079201010203', 'dothig@gmail.com',             '0355749744', 'dothig',             'tinibook',     '1'),
(011, 'Do Van H',           '079202010203', 'dovanh@gmail.com',             '0355749744', 'dovanh',             'tinibook',     '1'),
(012, 'Chau Dang K',        '079203010203', 'chaudangk@gmail.com',          '0355749744', 'chaudangk',          'tinibook',     '1'),
(013, 'Huynh L',            '079204010203', 'huynhl@gmail.com',             '0355749744', 'huynhl',             'tinibook',     '1'),
(014, 'Tran Le M',          '079205010203', 'tranlem@gmail.com',            '0355749744', 'tranlem',            'tinibook',     '1'),
(015, 'Tran Thi N',         '079210010203', 'tranthin@gmail.com',           '0355749744', 'tranthin',           'tinibook',     '1'),
(016, 'Nguyen Mai P',       '079220010203', 'nguyenmaip@gmail.com',         '0355749744', 'nguyenmaip',         'tinibook',     '2'),
(017, 'Nguyen Le Q',        '079230010203', 'nguyenleq@gmail.com',          '0355749744', 'nguyenleq',          'tinibook',     '2'),
(018, 'Hien Nie',           '079240010203', 'hiennie@gmail.com',            '0355749744', 'hiennie',            'tinibook',     '3'),
(019, 'Pham Van A',         '079250010203', 'phamvana@gmail.com',           '0355749744', 'phamvana',           'tinibook',     '3'),
(020, 'Nguyen Ngoc D',      '079200010203', 'nguyenngocd@gmail.com',        '0355749744', 'nguyenngocd',        'tinibook',     '3');


INSERT INTO Employee_Occupation (EID, Occupation) VALUES
(001, 'STORAGE_MANAGER'),
(002, 'SHOP_MANAGER'),
(003, 'ACCOUNTANT'),
(004, 'ACCOUNTANT'),
(005, 'STAFF'),
(006, 'STAFF'),
(007, 'STAFF'),
(008, 'STAFF'),
(009, 'STAFF'),
(010, 'STAFF'),
(011, 'STAFF'),
(012, 'STAFF'),
(013, 'STAFF'),
(014, 'STAFF'),
(015, 'STAFF'),
(016, 'STAFF'),
(017, 'STAFF'),
(018, 'STAFF'),
(019, 'STAFF'),
(020, 'STAFF');


CREATE TABLE Accountant AS
    SELECT * FROM Employee
    INNER JOIN Employee_Occupation ON Employee.EmployeeID = Employee_Occupation.EID
    WHERE Employee_Occupation.Occupation = 'ACCOUNTANT';


CREATE TABLE StorageManager AS
    SELECT * FROM Employee
    INNER JOIN Employee_Occupation ON Employee.EmployeeID = Employee_Occupation.EID
    WHERE Employee_Occupation.Occupation = 'STORAGE_MANAGER';

