create database DEASA_Database;
use DEASA_Database;

create table AssociationTable (
	SessionID int NOT NULL AUTO_INCREMENT,
    ParticipantID int NOT NULL,
    PRIMARY KEY (SessionID)
);

create table DataTable (
    PrimaryKey int NOT NULL AUTO_INCREMENT,
	SessionID int NOT NULL,
    UTC VARCHAR(50) NOT NULL,
	E4Time double NOT NULL,
    BVP float(10) NOT NULL,
    EDA float(10) NOT NULL,
    IBI float(10) NOT NULL,
    HeartRate float(10) NOT NULL,
    Temperature float(10) NOT NULL,
    PRIMARY KEY (PrimaryKey)
);

create table AccelerationTable (
    PrimaryKey int NOT NULL AUTO_INCREMENT,
	SessionId int NOT NULL,
    UTC VARCHAR(50) NOT NULL,
    E4Time double NOT NULL,
    AccelX int NOT NULL,
    AccelY int NOT NULL,
    AccelZ int NOT NULL,
    PRIMARY KEY (PrimaryKey)
);

create table ResponderTable (
    PrimaryKey int NOT NULL AUTO_INCREMENT,
    SessionID int NOT NULL,
    UTC VARCHAR(50) NOT NULL,
    Custom_Action VARCHAR(50),
    Custom_Message VARCHAR(50)
    PRIMARY KEY (PrimaryKey)
);

USE DEASA_Database;
INSERT INTO `DataTable`(SessionID,UTC,E4Time,BVP,EDA,IBI,HeartRate,Temperature) VALUES (1,"2020-01-09 13:47:14.470",1,1,1,1,1,1);