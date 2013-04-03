var index = require('../index');
var service = index.service(index.MongoAccess);

module.exports['POST /user'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    post: function (test) {
        var u = {
            uid: 'johnsmith',
            pwd: '123456',
            nick: 'John Smith',
            email: 'john.smith.17th@gmail.com'
        };
        service('/user', 'post', u, function (e, r) {
            test.done();
        });
    },

    duplication: function (test) {
        var u = {
            uid: 'johnsmith',
            pwd: '123456',
            nick: 'John Smith',
            email: 'john.smith.17th@gmail.com'
        };
        service('/user', 'post', u, function (e, r) {
            test.expect(1);
            test.equal(e.code, 503);
            test.done();
        });
    },

    male: function (test) {
        var u = {
            uid: 'jackjohns',
            pwd: '123456',
            nick: 'Jack Johns',
            email: 'some@example.com',
            gender: 'male'
        };
        service('/user', 'post', u, function (e, r) {
            test.done();
        });
    },

    female: function (test) {
        var u = {
            uid: 'jane',
            pwd: '123456',
            nick: 'Janny',
            email: 'janny@example.com',
            gender: 'female'
        };
        service('/user', 'post', u, function (e, r) {
            test.done();
        });
    },

    otherGender: function (test) {
        var u = {
            uid: 'nobody',
            pwd: '123456',
            nick: 'Nobody',
            email: 'nobody@example.com',
            gender: 'unknown'
        };
        service('/user', 'post', u, function (e, r) {
            test.expect(1);
            test.equal(e.code, 503);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user', 'post', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 503);
            test.done();
        });
    }
};

module.exports['GET /user'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/user', 'get', { uid: 'johnsmith' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.uid, 'johnsmith');
            test.done();
        });
    },

    withPwd: function (test) {
        service('/user', 'get', { uid: 'johnsmith', pwd: '123456' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.uid, 'johnsmith');
            test.done();
        });
    },

    nothing: function (test) {
        service('/user', 'get', { uid: 'smith' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user', 'get', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    withFilter: function (test) {
        service('/user', 'get', { uid: 'jane', filter: '-_id,uid,gender' }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    }
};

module.exports['PUT /user'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    put: function (test) {
        var p = { uid: 'johnsmith', status: 'call me maybe', address: 'C.A', phone: '123456789' };
        service('/user', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    nothing: function (test) {
        service('/user', 'put', { uid: 'johnsmith' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    somethingElse: function (test) {
        service('/user', 'put', { uid: 'johnsmith', some: 'foo' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    notHappen: function (test) {
        var p = { uid: 'nobody', status: 'foo' };
        service('/user', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user', 'put', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['DELETE /user'] = {
    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    del: function (test) {
        service('/user', 'delete', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    }
};

module.exports['PUT /user/pwd'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    put: function (test) {
        service('/user/pwd', 'put', { uid: 'jackjohns', pwd: '123456', value: '1234567' }, function (e, r) {
            test.done();
        });
    },

    notWork: function (test) {
        service('/user/pwd', 'put', { uid: 'jackjohns', value: '1234567' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/pwd', 'put', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['POST /user/q'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    post: function (test) {
        service('/user/q', 'post', { uids: ['johnsmith', 'jackjohns', 'jane', 'joseph'] }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    withFilter: function (test) {
        service('/user/q', 'post', { uids: ['johnsmith', 'jackjohns'], filter: '-_id,uid,pwd,email,tag' }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    noResult: function (test) {
        service('/user/q', 'post', { uids: [] }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/q', 'post', {}, function (e, r) {
            test.expect(2);
            test.equal(e.code, 400);
            test.equal(r, null);
            test.done();
        });
    },

    wrongParams: function (test) {
        service('/user/q', 'post', { uids: 'johnsmith jackjohns jane joseph' }, function (e, r) {
            test.expect(2);
            test.equal(e.code, 503);
            test.equal(r, null);
            test.done();
        });
    }
};