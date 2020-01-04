create database E4database;
use E4database;

create table AssociationTable (
	SessionID int NOT NULL AUTO_INCREMENT,
    ParticipantID int NOT NULL,
    PRIMARY KEY (SessionID)
);

create table DataTable (
    PrimaryKey int NOT NULL AUTO_INCREMENT,
	SessionID int NOT NULL,
    UTC datetime NOT NULL,
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
    UTC datetime NOT NULL,
    E4Time double NOT NULL,
    AccelX int NOT NULL,
    AccelY int NOT NULL,
    AccelZ int NOT NULL,
    PRIMARY KEY (PrimaryKey)
);

USE E4database;
INSERT INTO `dataTable`(SessionID,UTC,E4Time,BVP,EDA,IBI,HeartRate,Temperature) VALUES (1,NOW(),1,1,1,1,1,1);