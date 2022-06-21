# Credit Card Processor

## Overview 

This is an application for Credit Card providers, where they can add new credit card accounts and view them all as well.

### Technologies

Programming Language : Java 1.8 \
Libraries Used : Spring Boot 2.7.1(Rest API, H2 DB), React , Maven 3.3.2 

### Rest API Payloads

1) GET http://localhost:8080/creditCard - Used to get list of credit cards.

   Request : NA \
   Response : 

    ````json
    [
       {
         "card_no": "79927398713",
         "card_holder_name": "Amruta",
         "balance": 0,
         "credit_limit": 1000
       }
    ]
    ````

2) POST http://localhost:8080/creditCard - Used to create/add new credit card 
      
      Request :

      Content-Type : application/json
      ````json
       {
         "card_no": "79927398713",
         "card_holder_name": "Amruta",
         "credit_limit": 1000
       }
    ````
      Response :

   ````json
   {
   "card_no": "79927398713",
   "card_holder_name": "Amruta",
   "balance": 0,
   "credit_limit": 1000
   }
    ````
   #### If invalid input provided:
   
   Request :\
    Content-Type : application/json
      ````json
       {
         "card_no": "7992739871",
         "card_holder_name": "Amruta",
         "credit_limit": 1000
       }
    ````
   Response :
   ````json
   {
   "timestamp":"2022-06-20T14:00:56.285+00:00",
   "status":400,
   "errors":["Card number is not valid."]
   }
    ````
   #### Validations:
   1. All fields are required.
   2. Card no. should pass luhn check.

      
### Frontend Validations
1. All fields are required.
2. Card no. should be numeric and vary upto 19 digits.
3. Card Limit should be numeric.


### Install and Run
##### Backend
mvn test : to run test cases \
mvn clean package : create war for backend rest api services \
Deploy the war in web app server to run the application
##### Frontend 
npm install : to install required libraries \
npm run build : to create prod build \
npm start : to run app in dev/local


