# Welcome to Booking_service

## Project Setup
-clone the git repository

-Execute `npm install` on the same path as the root directory of the downloaded project

-create a new .env file in the root directory and add the following enviroment variables

--`PORT=3002`


-Inside the 'src/config' folder create a new file 'config.json' and then add the following json

{
  "development": {
    "username": "your-db-login name",
    "password": "your-db-password",
    "database": "Booking_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
}

"once you have added the json file just go to git and write `npx sequelize db:create`"
  
  and to connect to sql server run `npx sequelize db:migrate`

## DB Design
A booking model requires a user ,noOfSeats and the flight they want to book.
the total price of the seats is calculated in the booking-service depending on the noOfSeats from the user and price of one seat from the flight serivce.

## Microservice
We need to fetch the flight data from the flight service and User from AuthService.We are using axios for fetching the data of flight and user.When the booking is coniformed we are sending a request to the remainder service to send a mail to the user that their booking is coniformed.

## RabbitMq for messaging service
we know that all the services are hosted on different servers.What is going to happen if we are sending a request to a server and the service is down.We use rabbitmq messeging  that is going to store the request and sends the request to the service when the service starts running.

