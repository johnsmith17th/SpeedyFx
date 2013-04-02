#Data Service

This service focus on data storage and data access and should ignore any application or business logic. It use **mongodb** as underlying database currently.

## REST API

### /user

* GET - Get one user
* POST - Create user
* PUT - Update property of user

### /user/q
* POST - User query with id array

### /contact
* GET - Get contact information of user
* PUT - Update or create contact information
* DEL - Delete contact information

### /message
* GET - Get messages
* POST - Create a message
* DEL - Delete messages

## Data Structure

### User

* uid -	user identification, required and must be unique, email by default
* pwd - password for authentication, required
* nick - display name of user, required
* email - email address of user, required
* gender - gender of user, could be **male** or **female**
* image - a URL of user's avartar
* status - description information of  user
* address - where the user is
* location - (not available yet) geocode that identify the location of user
* phone - phone number of user

### Contact

* uid - user identification
* cid - contact user identification
* alias - contact alias
* black - whether the contact is  in blacklist

### Message

* uid - user identification for receiver of message
* mid - message identification
* msg - the message raw data
* time - the moment the server received the message