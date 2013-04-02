var index = require('./index');
var service = index.service(index.MongoAccess);

module.exports.users = {

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

    postDuplication: function (test) {
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

    postMale: function (test) {
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

    postFemale: function (test) {
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

    postOtherGender: function (test) {
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

    postNothing: function (test) {
        service('/user', 'post', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 503);
            test.done();
        });
    },

    get: function (test) {
        service('/user', 'get', { uid: 'johnsmith' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.uid, 'johnsmith');
            test.done();
        });
    },

    getWithPwd: function (test) {
        service('/user', 'get', { uid: 'johnsmith', pwd: '123456' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.uid, 'johnsmith');
            test.done();
        });
    },

    getNothing: function (test) {
        service('/user', 'get', { uid: 'smith' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    },

    getWihoutParams: function (test) {
        service('/user', 'get', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    getWithFilter: function (test) {
        service('/user', 'get', { uid: 'jane', filter: '-_id,uid,gender' }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    put: function (test) {
        var p = { uid: 'johnsmith', status: 'call me maybe', address: 'C.A', phone: '123456789' };
        service('/user', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    putNothing: function (test) {
        service('/user', 'put', { uid: 'johnsmith' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    putNothingElse: function (test) {
        service('/user', 'put', { uid: 'johnsmith', some: 'foo' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    putNotHappen: function (test) {
        var p = { uid: 'nobody', status: 'foo' };
        service('/user', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    putWithoutParams: function (test) {
        service('/user', 'put', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    updatePassword: function (test) {
        service('/user/pwd', 'put', { uid: 'jackjohns', pwd: '123456', value: '1234567' }, function (e, r) {
            test.done();
        });
    },

    updatePasswordNotWork: function (test) {
        service('/user/pwd', 'put', { uid: 'jackjohns', value: '1234567' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    updatePasswordWithoutParams: function (test) {
        service('/user/pwd', 'put', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    userQuery: function (test) {
        service('/user/q', 'post', { uids: ['johnsmith', 'jackjohns', 'jane', 'joseph'] }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    userQueryWithFilter: function (test) {
        service('/user/q', 'post', { uids: ['johnsmith', 'jackjohns'], filter: '-_id,uid,pwd,email,tag' }, function (e, r) {
            console.log(r);
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    userQueryNoResult: function (test) {
        service('/user/q', 'post', { uids: [] }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    userQueryNoParams: function (test) {
        service('/user/q', 'post', {}, function (e, r) {
            test.expect(2);
            test.equal(e.code, 503);
            test.equal(r, null);
            test.done();
        });
    },

    userQueryWrongParams: function (test) {
        service('/user/q', 'post', { uids: 'johnsmith jackjohns jane joseph' }, function (e, r) {
            test.expect(2);
            test.equal(e.code, 503);
            test.equal(r, null);
            test.done();
        });
    }
};

module.exports.somethingDontExist = {
    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    deleteUser: function (test) {
        service('/user', 'delete', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    }
};

