# Presnece Service

This service is to maintain and manage presence information and presence subscription of clients.

**Presence information will be store in memory currently. And I consider to put them into Redis in future.**

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

## Presence Store Interface
There are two kinds of presence store strategies: memory-based presence store and redis-based presence store. Both should use the same interface for access.

### Store#get

	store.get(uid, callback);

Get presence information of user with user id, and **callback** is a function like:

	callback(err, result)

### Store#query

	store.query(arr, callback);

Get presence information of users, the parameter **arr** is a user id array:

	arr = [ 'id-1', 'id-2', 'id-3', ... ]

### Store#register

	store.register(uid, cid, status, callback);

Register presence information, the parameter **uid** is user id, **cid** is a client id or session id, and **status** is the status of presence, which would be: online, busy, away, hide.

### Store#unregister

	store.unregister(uid, cid, callback);

Unregister presence information.

### Store#subscribe

	store.subscribe(cid, arr, callback);

Publish presence information subscription. The parameter **cid** is client id or session id of subscriber, and **arr** is a user id array that the subscriber to subscribe.

### Store#unsubscribe

	store.unsubscribe(cid, arr, callback);

Cancel presence information subscription. The parameter **cid** is client id or session id of subscriber, and **arr** is a user id array that the subscriber to unsubscribe.

### Store#subscriber

	store.subscriber(uid, callback);

Get subscribers of user. The parameter **uid** is the user's id. The result is a client/session id array which subscribed the presence information of user with identify uid.

### Store#clear

	store.clear(callback);

Clear presence store.
