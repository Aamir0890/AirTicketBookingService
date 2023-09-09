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

- RabbitMq server is used bewteen Booking Service and Remainder Service
 
## RabbitMq for messaging service
- We know that all the services are hosted on different servers.What is going to happen if we are sending a request to a server and the service is down.We use rabbitmq messeging  that is going to store the request and sends the request to the service when the service starts running.
- RabbitMQ is an open-source message-broker software that is used for inter-service communication.
- It recieves and store request from a service.It will store the request until the recieving service is down.Once the recieving service is online it will send the request to the corresponding service.
- Please refer to the RabbitMq site to know more (https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)


