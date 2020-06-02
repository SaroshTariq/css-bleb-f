--
-- Database: `css-bleb`
--
CREATE DATABASE IF NOT EXISTS `css-bleb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `css-bleb`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(17) NOT NULL,
  `date_of_birth` date NOT NULL DEFAULT '0107-09-09',
  `postal_address` varchar(50) NOT NULL,
  `password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `first_name`, `last_name`, `email`, `mobile`, `date_of_birth`, `postal_address`, `password`) VALUES
(1001, 'Haniah', 'Sarfraz', 'haniah@gmail.com', '03210000', '0107-09-09', 'adasdas', '$2b$10$9mB51ShcNDD04Hj9tgzoSOzOjyQ2D7lHuWoSsxYs5a/lKLbdmPnJy'),
(1002, 'Muhammad', 'Sarosh', 'sarosh@gmail.com', '0321345', '2017-05-10', 'adasdas', '$2b$10$v4eRRlMyYJ6c3Oe1VxKPluJ/PmLXsiT6e.vND2ksBi/sOEPVEko3C'),
(1003, '', '', 'ali@gmail.com', '', '0107-09-09', '', '$2b$10$QoRFLq.iHFtpIRRiWMTjUOa5cz7nvEL.F.0X2y0hMeWW/bcvYZsQy');

-- --------------------------------------------------------

--
-- Table structure for table `beacon`
--

CREATE TABLE `beacon` (
  `beacon_id` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `uuid` varchar(100) NOT NULL,
  `major_id` varchar(100) NOT NULL,
  `minor_id` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'unactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beacon`
--

INSERT INTO `beacon` (`beacon_id`, `location`, `uuid`, `major_id`, `minor_id`, `status`) VALUES
(2001, 'Cs Entrance 1', 'c7b1c90ed0a3a02e0bef5d36ea8f7103', 'edd1ebeac04e5defa017', 'test2', 'active'),
(2002, 'Cs Corridor 1', 'a4e69d2d84ab5619417f6fa4e7db1101', 'jkahsdjkasmbhjkhy', 'test2', 'active'),
(2003, 'Cs Entrance 2', '50f7aecb4b0a27ab088c53a9f593fd19', 'jbfjsbdf', 'test2', 'active'),
(2004, 'Cs Stairs 3', '9282fee8a69c9baab3a3a1bebd444008', 'none', 'test2', 'active'),
(2005, 'Room#1', '5279386ddb8266855cf689d7845ef939', 'none', 'test2', 'active'),
(2006, 'Room#2', 'cccfa490a07e6fe9b21b925a24991c10', 'none', 'test2', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `description`) VALUES
(3001, 'IOT', 'The internet of things, or IoT, is a system of interrelated computing devices, mechanical and digital machines, objects, animals or people that are provided with unique identifiers (UIDs) and the ability to transfer data over a network without requiring human-to-human or human-to-computer interactio'),
(3002, 'BlockChain', 'A digital ledger in which transactions made in bitcoin or another cryptocurrency are recorded chronologically and publicly.'),
(3003, 'Electronic Commerce', 'Ecommerce, also known as electronic commerce or internet commerce, refers to the buying and selling of goods or services using the internet, and the transfer of money and data to execute these transactions.'),
(3004, 'Algorithm development', 'One of the most important aspects of algorithm design is creating an algorithm that has an efficient runtime, also known as its Big O. Typical steps in development of algorithms: Problem definition. Development of a model. Specification of algorithm.'),
(3005, 'Machine learning', 'Machine learning is a field of computer science that uses statistical techniques to give computer systems the ability to \"learn\" (e.g., progressively improve performance on a specific task) with data, without being explicitly programmed. The name machine learning was coined in 1959 by Arthur Samuel.'),
(3006, 'Hyperledger', 'Hyperledger (or the Hyperledger project) is an umbrella project of open source blockchains and related tools, started in December 2015 by the Linux Foundation, to support the collaborative development of blockchain-based distributed ledgers.'),
(3007, 'Computer Networks', 'A computer network is a set of computers connected together for the purpose of sharing resources. The most common resource shared today is connection to the Internet. Other shared resources can include a printer or a file server. '),
(3008, 'Information Science', 'Computer information system(s) (CIS) is a field studying computers and algorithmic processes, including their principles, their software and hardware designs, their applications, and their impact on society, whereas IS emphasizes functionality over design.');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `registration_id` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `overview` varchar(2000) NOT NULL,
  `photo1` varchar(200) NOT NULL DEFAULT 'photos\\projects\\dummy_fyp.jpg',
  `photo2` varchar(200) NOT NULL DEFAULT 'photos\\projects\\dummy_fyp.jpg',
  `photo3` varchar(200) NOT NULL DEFAULT 'photos\\projects\\dummy_fyp.jpg',
  `category_id` int(11) DEFAULT NULL,
  `beacon_id` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'unverified'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `registration_id`, `title`, `overview`, `photo1`, `photo2`, `photo3`, `category_id`, `beacon_id`, `status`) VALUES
(9000, 'SP18-BCS-003', 'None', 'None.', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3003, 2003, 'unverified'),
(9001, 'SP18-BCS-001', 'CSS-BLEB', 'The proposed system is designed and build to guide visitors and new inducted students (from here will be called end user) through university. The campus signage has maps on different points in campus, but maps are not very helpful while looking for a specific room in a specific department. The proposed campus signage system is targeted towards providing end users relevant and specific information regarding rooms, departments and concerned persons.\r\nThe system will be built to guide end user from the gates of the university to open house projects. The project will be implemented using Bluetooth Low Energy (BLE) Beacons. These beacons transmit a tiny chunk of information to a smartphone using Bluetooth. These beacons will also be attached to the displayed project stations, so that when the end user visit the stations their device will display the information regarding the specific project on their device regardless the project representors are available or not. Which results in time saving.\r\n', 'photos/projects/cssbleb.png', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 3001, 2006, 'verified'),
(9002, 'SP18-BCS-002', 'Hire\'em', 'none', 'photos/projects/hirem.png', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 3001, 2002, 'verified'),
(9004, 'SP18-BCS-004', 'Smartshopping', 'None.', 'photos\\projects\\ss.png', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3003, 2003, 'verified'),
(9005, 'SP18-BCS-005', 'Shop Grab', 'Amazon (Amazon.com) is the world\'s largest online retailer and a prominent cloud services provider. ... Amazon Web Services(AWS) is a comprehensive, evolving cloud computing platform. The first AWS offerings were launched in 2006 to provide online services for websites and client-side applications.', 'photos\\projects\\sg.png', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3005, 2002, 'verified'),
(9006, 'SP18-BCS-006', 'MSRV', 'None.', 'photos\\projects\\msrv1.png', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3002, 2005, 'verified'),
(9007, 'SP18-BCS-007', 'Bus Tracking System', 'None.', 'photos\\projects\\bts.png', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3004, 2006, 'verified'),
(9009, 'SP18-BCS-009', 'Autonomous Car', 'None.', 'photos\\projects\\ac.png', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3005, 2006, 'verified'),
(9010, 'SP18-BCS-010', 'Smart Home', 'None.', 'photos\\projects\\sh.png', 'photos\\projects\\dummy_fyp.jpg', 'photos\\projects\\dummy_fyp.jpg', 3001, 2005, 'verified'),
(9011, 'SP18-BCS-011', 'Saviour ', 'In this age of technology and smartphones every manual process is converting to a digital process. Still there are some processes which are manual and have not entered the realm of smart and integrated technology. Analyzing the possibilities we found that parenting problems are still not being solved regardless of these endless possibilities especially the stressed parents are not yet availing advantages from these miraculous and remarkable technological innovations. ', 'photos\\projects\\Sun Dec 09 2018 21-41-16 GMT+0500 (Pakistan Standard Time)-images.jpg', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 3001, 2005, 'unverified'),
(9012, 'SP15-BCS-019', 'project lab', 'xyz', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 3001, 2001, 'unverified'),
(9013, 'sp15-bcs-020', 'project', 'sedrftgyhj', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 3001, 2001, 'verified'),
(9014, 'SP18-BCS-021', 'Hostel Management', 'None.', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 'photos/projects/dummy_fyp.jpg', 3007, 2006, 'verified');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `token` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`token`) VALUES
('4GxGsCHTfjBPvvBGhWw'),
('4oK-x6nq8uD0-YtdGCy'),
('d-Fae7RNvIqOL3qGo27'),
('dItjVrubV1MO1UXkKbI'),
('fhm5dvqgujehdC9uiAN'),
('HYJ-2Z4p9XJFvR7VSx7'),
('jMTyODOztpZvPYMKH6k'),
('l91qB807oe6gEdwWD4G'),
('o4VYly05K3nChCfTmPx'),
('PbfZTLBHr5nCp7s-oSK'),
('rd0MZoZbrRfMLBQgkaL'),
('TCqCjpwwFR3eYpT8V2A'),
('VAMc7F1s-YGkm2rx4dO'),
('wl3hFV0LR2VhVEhybMb');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `registration_id` varchar(20) NOT NULL,
  `display_picture` varchar(200) NOT NULL DEFAULT 'photos\\students\\dummy_student.png',
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(17) NOT NULL,
  `date_of_birth` date NOT NULL,
  `postal_address` varchar(500) NOT NULL,
  `overview` varchar(2000) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `registration_id`, `display_picture`, `first_name`, `last_name`, `email`, `mobile`, `date_of_birth`, `postal_address`, `overview`, `project_id`, `password`) VALUES
(8007, 'SP15-BCS-024', 'photos\\students\\dummy_student.png', 'Haniah', 'Sarfraz', 'haniahsarfraz96@gmail.com', '03214567821', '1899-11-30', 'Islamabad', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year.\r\nMy other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity.\r\nDuring my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it.\r\nI am good with databases and I like to resolve problems in design.\r\n', 9001, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8008, 'SP15-BCS-041', 'photos\\students\\Sat Dec 08 2018 19-49-06 GMT+0500 (Pakistan Standard Time)-IMG_20160315_121017.jpg', 'Muhammad Sarosh', 'Tariq', 'saroshtariq77@gmail.com', '03215031806', '1996-07-26', 'None.', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year.\r\nMy other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity.\r\nDuring my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it.\r\nI am good with databases and I like to resolve problems in design.\r\n', 9009, '$2b$10$tfm0Wz3gc9U3cvMlXYTDJeI6eMSeKRlbyaSz3DdBzVER/ikS2as.e'),
(8009, 'SP15-BCS-038', 'photos\\students\\dummy_student.png', 'Muhammad Asheer', 'Hassan', 'asheer.hassan.732@gmail.com', '3215031806', '1996-12-12', 'Chakwal', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year.\r\nMy other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity.\r\nDuring my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it.\r\nI am good with databases and I like to resolve problems in design.\r\n', 9002, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8010, 'SP15-BCS-036', 'photos\\students\\dummy_student.png', 'Muhammad', 'Abdullah', 'muhammadabdullah084@gmail.com', '03215032156', '1995-12-01', 'Layyah', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year.\r\nMy other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity.\r\nDuring my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it.\r\nI am good with databases and I like to resolve problems in design.\r\n', 9013, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8011, 'SP15-BCS-004', 'photos\\students\\dummy_student.png', 'Ali', 'Raza', 'alirazaarshad.bcs@gmail.com', '03215674198', '1996-12-12', 'Gujranwala', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year.\r\nMy other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity.\r\nDuring my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it.\r\nI am good with databases and I like to resolve problems in design.\r\n', 9005, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8012, 'SPP15-BCS-040', 'photos\\students\\dummy_student.png', 'Hamza', 'Irfan', 'hamza.irfan2012@gmail.com', '03214567234', '1996-12-11', 'Rawalpindi', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year. My other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity. During my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it. I am good with databases and I like to resolve problems in design.', 9004, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8013, 'Sp15-BCS-001', 'photos\\students\\dummy_student.png', 'Bilal', 'Ahmad', 'bilalahmad947@gmail.com', '03078641781', '1996-12-02', 'Gujranwala', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year. My other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity. During my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it. I am good with databases and I like to resolve problems in design.', 9006, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8014, 'SP15-BCS-018', 'photos\\students\\dummy_student.png', 'Hamza', 'Tahir', 'htcht786@gmail.com', '03451876345', '1996-12-26', 'Bahawal Pur', 'I am a mean stack developer with full conceptual and practical knowledge of front end and backend. I have developed, lead and provided consultation for multiple projects in the past year. My other web-based experiences include bare php and JavaScript which gave me a start to learn a framework for the sake of simplicity. During my student life I have worked with Java Swing and JavaFx Desktop applications. I have also worked on Native android applications. The first language I learned was is Java and after four years of time I have got the hang of it. I am good with databases and I like to resolve problems in design.', 9007, '$2b$10$VPf0fv.Ym.1B.ANoX16xwOSiR4KhKvXUHjAU.vVmSBblCF1NgeMWu'),
(8015, 'SP15-BCS-012', 'photos/students/dummy_student.png', 'Danish', 'Javed', 'danish@gmail.com', '03224566667', '1996-12-19', 'Islamabad', 'None', 9010, '$2b$10$RBKGDSfifXBcpipSchasW.Vbe7rw0LMZsKq/8pkDT7H6efv57I126'),
(8016, 'SP15-BCS-016', 'photos\\students\\dummy_student.png', '', '', 'hamnaaslam03@gmail.com', '', '0000-00-00', '', '', 9014, '$2b$10$rGY728a1bD9rJWJc2/X09O8/P5XA7dx0nLXy.8JdAdXxvqbYCZVEq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `beacon`
--
ALTER TABLE `beacon`
  ADD PRIMARY KEY (`beacon_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `beacon_id` (`beacon_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `project_id` (`project_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9015;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8017;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`beacon_id`) REFERENCES `beacon` (`beacon_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;