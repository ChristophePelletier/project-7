# Installation

## Back

- npm install
- node app.js

## Front

- npm install
- npm run serve

# Usage

## Back

### You can use the .env-model for the environment variables :

- first rename the file : .env
- then choose the RTS : the signature for the encoding of the jsonweboken
- then choose the name of your database
- then add you DATABASEUSER and your DATABASEPASSWORD of your MYSQL database

### At the root of the back, create an "images" directory where the images will be downloaded

### if you want to create a first admin user

just comment lines 89 to 94
in controllers / user.js -> signupAdmin
then :
http://localhost:8080/admin
to create the admin
after : decomment the lines

## Front

after npm run serve a link to
http://localhost:8080/
will appear in the console

- in services/api.js
  the baseURL for the back is : http://localhost:3000
- in router/index.js
  the baseURL for the back is : "http://localhost:3000/"

## Back and Front

- Use `Ctrl+C` in the terminal to stop the local server.

# More details

## Back

- Database configuration : config -> configDb.js

## Front

- README.md
