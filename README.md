# Fi-Tech Full-stack Course Final Project: Timelogger
This is a final project for FiTech Software Development: Full-stack course.
The app is a simple workhour logger, where you can log your worktime done.
Demonstration video: https://youtu.be/w9Kqgwj0fJM

You can test the app from this link: https://thawing-spire-40928.herokuapp.com/
You can use testing credentials with username: *adamsmith*, and password: *123456*. 
Or you can register and test the app yourself.

In case you want to test it locally:
- You need Node.js and MongoDB installed on your device
- Clone this app in your desired location
- In terminal, do:
```
cd [cloning location] //Goes into the location where you cloned the app
npm install //Installs necessary packages
nodemon //Starts the app
```
- After the steps above are done, you can use the app by going to http://localhost:3000/ on your browser

## About the app
This app is a concept for logging your worktime. The core functions of this app are 'logging a workhour entry' and 'observing your workhour history'.
The app also has basic registration and login functionality.

### Logging workhours:
On page 'New log', you can create a new workhour log. The functionality is simple: you put in the date, hours and minutes. Pressing 'Log' will log the entry to the database.

### Observing workhour logs:
On page 'My workhours' you'll see your entries you have logged. By default, it shows entries from the ongoing week. It sorts by latest on top by default.
There are two date inputs, where you can set the boundary dates where to search entries in between of.


### Notes:
This app has a very basic functionality. It does what it's meant to do, but could see a few minor improvements, like being able to delete entries.
As of now, I am satisfied with the outcome, but I might come back to this project and improve it.
