# DEASA Node.js Backend

## About

A simple Node.js backend used in conjunction with the DEASA frontend, empactica_app, and other DEASA tools for piping data to a mysql database.

## Requirements

- A mysql database named "DEASA_Database" is needed.
- Node libraries such as npm and nodemon need to be installed for backend services.
- A shared router in which both the andriod device and computer is needed.

## Setup

- In "keys" ensure that all database login credentials are valid.
- In "index" ensure that the port number is congruent with the port in the empactica_app project.
- Run the "Initializing_database" script on a fresh mysql database to initialize database.

## Getting started

Run the following to install all dependencies:
````
npm install
````
Run the following to just start the node.js backend services:
````
nodemon index.js
````
