var index = require('../index');
var service = index.service(index.MongoAccess);

module.exports['POST /message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    post: function (test) {
        var p = {
            uid: 'johnsmith',
            mid: 'a',
            msg: 'foo'
        };
        service('/message', 'post', p, function (e, r) {
            test.expect(1);
            test.equal(null, e);
            test.done();
        });
    },

    duplicate: function (test) {
        var p = {
            uid: 'johnsmith',
            mid: 'a',
            msg: 'foo'
        };
        service('/message', 'post', p, function (e, r) {
            test.expect(1);
            test.equal(null, e);
            test.done();
        });
    },

    another: function (test) {
        var p = {
            uid: 'johnsmith',
            mid: 'b',
            msg: 'bar'
        };
        service('/message', 'post', p, function (e, r) {
            test.expect(1);
            test.equal(null, e);
            test.done();
        });
    },

    noParams: function (test) {
        service('/message', 'post', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 503);
            test.done();
        });
    }
};

module.exports['PUT /message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    put: function (test) {
        service('/message', 'put', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    }

};

module.exports['GET /message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/message', 'get', { uid: 'johnsmith' }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    withMid: function (test) {
        service('/message', 'get', { uid: 'johnsmith', mid: 'a' }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    withFilter: function (test) {
        service('/message', 'get', { uid: 'johnsmith', filter: '-_id,uid,mid,msg,tag' }, function (e, r) {
            test.expect(1);
            test.notEqual(r, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/message', 'get', { }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }

};

module.exports['DELETE /message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    delWithMid: function (test) {
        service('/message', 'delete', { uid: 'johnsmith', mid: 'b' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    delAll: function (test) {
        service('/message', 'delete', { uid: 'johnsmith' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function(test) {
        service('/message', 'delete', { }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }

};