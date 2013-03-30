#Data Service

This service focus on data storage and data access and should ignore any application or business logic. It use **mongodb** as underlying database currently.

## Schema

Schema of data collections can be found in **model.js**

### User
	var UserSchema = new Schema({
    	uid: { type: String, required: true, index: { unique: true } },
    	pwd: { type: String, required: true, select: false },
    	nick: { type: String, required: true },
    	email: { type: String, required: true },
    	gender: String,
    	image: String,
    	status: String,
    	addres: String,
    	phone: String
	});

### Contact
	var ContactSchema = new Schema({
    	uid: { type: String, required: true, index: true },
    	cid: { type: String, required: true, index: true },
    	alias: { type: String, 'default': '' },
    	black: { type: Boolean, 'default': false }
	});

### Message
	var MessageSchema = new Schema({    
    	uid: { type: String, required: true, index: true },
    	mid: { type: String, required: true, index: true },
    	msg: { type: String, required: true },
    	time: { type: String, required: true, 'default': Date.now }
	});

##REST API

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