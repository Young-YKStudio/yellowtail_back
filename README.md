
# MERN Auth template with Redux

This repo is a foundation for most of web application that requires login function.




## Versions and Features

- Express v4.18.1
- mongodb v4.7.0
- nodemon v2.0.16
- nodemailer v6.7.5


## Installation

clone this repo

```bash
  git clone https://github.com/Young-YKStudio/MERN-auth-with-Redux-back.git .
```
#### Create Cluster on mongoDB, then get address point
#### Get Email address for the client
setup email client to send email as domain address with 2 auth, and app password from google
#### Get front-end address

create .env, with following
```bash
    PORT = 8000
    MONGO_URI = {your address}
    JWT_SECRET = {your secret string}
    JWT_EXPIRE = 60min
    EMAIL_ACCT = {clent original email address, Gmail}
    EMAIL_PW = {client app pw from Gamil}
    CLIENT_URL = {your front-end address}
```
install dependencies
```bash
    npm i
```
run app with 
```
   nodemon
```