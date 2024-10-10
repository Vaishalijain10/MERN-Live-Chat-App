backend
------------------------------------------------------------------------------------------------
run server.js  -> before adding script in package.json file. 
                (just change the name of the main file -> from index.js to server.js)
                node server.js
                (after adding additional script)  ->    "start": "node server.js"
                npm start 
                (after adding nodemon package and additional script)  -> "start": "nodemon server.js"
                npm start
-------------------------------------------------------------------------------------------------
1. npm init -y
2. npm i express dotenv nodemon 
3. create server.js , .env file, and data folder 
4. created Models folder -> chatModels.js -> we store schema.
5. npm i mongoose -> it is used to connect the mongodb database and make queries to our db.
6. npm i colors -> its is used to customize the termial
7. created config folder : db.js file. Additionally modified .env file and server.js to connect it with the database.
8. created routes folder : userRoutes to handle the routes i.e api (endpoints) and controllers folder : userControllers file where the logic of the routes will be written -> handle errors.
9.  npm i express-async-handler -> used to monitor the errors in controllers folder.
10. To generate token -> we created a file in config folder -> generateToken.js
11. npm i jsonwebtoken -> jwt -> json web token -> helps in authorization -> encode and decode 
12. tested with postman -> created a collection Talk-A-Tive and an environment variable Talk-A-Tive
13.  npm i bcryptjs -> to  encrypt the password
14. to encrypt the password in hash algorithm we use bcrypt package and then saving the encrypted password in the database
15. updated the  user schema to encrypt the password for registration and login
16. created a  middleware to handle the error and we updated the server file.
17. allUsers -> controller to enable the search option and disabling self search.
18. created another middleware "authMiddleware" to check weather the user is logged in or not -> auth is connected to userController directly and indirectly by userRoutes where the function protect is used.
19. creating new route -> chatRoute
20. bulbul -  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVhZjYyNWY5Y2U0MTVkMjUxZjYwMDAiLCJpYXQiOjE3MTcyNTM3NDEsImV4cCI6MTcxOTg0NTc0MX0.caAnRyRv2H1MdP_o7wbbp4Iy4dy2bmr8yfvatuTmRK4"
Testing -"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVhMDU0ZDgwNDMyMGNmNjM4Y2QyYTUiLCJpYXQiOjE3MTcyNTM4NzUsImV4cCI6MTcxOTg0NTg3NX0.pcfSLqeY5r9huIZeuD0FWiQJloaFfYMFebw73owklbA"
21. now, to create chat, for logged in user we submit the token and  in json format we submit the userId.
22. group ->  Json to stringify -> url  searched -> https://onlinetools.com/json/stringify-json
Json -> ["665af625f9ce415d251f6000","665b61f69ebfcb307f8e5f29"]
Stringify -> "[\"665af625f9ce415d251f6000\",\"665b61f69ebfcb307f8e5f29\"]"
23. we completed chatRoute and chatController
24. 