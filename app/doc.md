# Application Service

This service entity is for management of account, user, contact, and message.

## REST API

#### /auth
* POST - For user authentication

#### /register
* GET - Check if the email address is available for register
* POST - User register

#### /user
* GET - Get user information

#### /user/contact
* GET - Get user contact
* PUT - Add user contact or update contact alias
* DEL - Delete contact of user

### /user/blacklist
* GET - Get user blacklist
* PUT - Add somebody to blacklist
* DEL - Delete from blacklist

### /user/message
* GET - Get offline message of user
* DEL - Delete the message