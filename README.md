# Empatica E4 Node.js Backend

## About

A simple Node.js backend used in conjunction with the empactica_app project for piping data collected to a mysql database.

## Requirements

- A mysql database named "E4database" is needed.
- Node libraries such as npm and nodemon need to be installed for backend services.
- Python libraries such as matplotlib, pymysql, and etc. need to be installed for graphing services.
- A shared router in which both the andriod device and computer is needed.

## Setup

- In "keys" ensure that all database login credentials are valid.
- In "index" ensure that the port number is congruent with the port in the empactica_app project.
- Run the "Initializing_database" script on a fresh mysql database to initialize database.

## Getting started

- Run "nodemon index.js" to start backend services.
- Run "Python3 graph.py {sessionID} {Optional_Tick_Number}" to graph all pushed backend data of that sessionID.
