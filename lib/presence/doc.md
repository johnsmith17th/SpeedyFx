# Presnece Service

This service is to maintain and manage presence information and presence subscription of clients.

**Presence information will be store in memory currently. And I consider to put them into Redis in future.**

## Presence Store Interface
There are two kinds of presence store strategies: memory-based presence store and redis-based presence store. Both should use the same interface for access.

### Store#get
### Store#query
### Store#register
### Store#unregister
### Store#subscribe
### Store#unsubscribe
### Store#subscriber

## REST API

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