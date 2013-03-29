#Presnece Service

This service is to maintain and manage presence information and presence subscription of clients.

##REST API

####/presence
* GET - Get presence information of user.
* PUT - Update presence information of user.
* DEL - Delete presence information of user.

####/presence/q
* POST - Query the presence information of users.

####/subscription
* PUT - Create or update presence subscription of client.
* DEL - Delete presence subscription of client.

####/subscriber
* GET - Get subscriber of user.