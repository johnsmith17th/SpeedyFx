var service = require('../index').service;

module.exports['GET /user'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/user', 'get', {}, { uid: 'johnsmith@host' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.uid, 'johnsmith@host');
            test.done();
        });
    },

    nothing: function (test) {
        service('/user', 'get', {}, { uid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user', 'get', {}, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    badParams: function (test) {
        service('/user', 'get', {}, { foo: 'foo' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};