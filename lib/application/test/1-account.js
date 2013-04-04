var service = require('../index').service;

module.exports['POST /register'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    register: function (test) {
        var p = {
            uid: 'johnsmith',
            pwd: '123456',
            nick: 'John Smith',
            email: 'johnsmith@host'
        };
        service('/register', 'post', {}, p, function (e, r) {
            test.done();
        });
    },

    again: function (test) {
        var p = {
            uid: 'jackfrost',
            pwd: '1234567',
            nick: 'Jake Frost',
            email: 'jackfrost@host'
        };
        service('/register', 'post', {}, p, function (e, r) {
            test.done();
        });
    },

    more: function (test) {
        var p = {
            uid: 'easterbunny',
            pwd: '7654321',
            nick: 'Easter Bunny',
            email: 'easterbunny@host'
        };
        service('/register', 'post', {}, p, function (e, r) {
            test.done();
        });
    },

    noParams: function (test) {
        service('/register', 'post', {}, {}, function (e, r) {
            test.expect(1);
            test.notEqual(e, null);
            test.done();
        });
    },

    someWrong: function (test) {
        var p = {
            a: 'wrong',
            b: 'wrong',
            c: 'wrong',
            d: 'wrong'
        };
        service('/register', 'post', {}, {}, function (e, r) {
            test.expect(1);
            test.notEqual(e, null);
            test.done();
        });
    }
};

module.exports['POST /auth'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    auth: function (test) {
        var p = {
            uid: 'johnsmith@host',
            pwd: '123456'
        };
        service('/auth', 'post', {}, p, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r, true);
            test.done();
        });
    },

    wrongPwd: function (test) {
        var p = {
            uid: 'jackfrost@host',
            pwd: '123456'
        };
        service('/auth', 'post', {}, p, function (e, r) {
            test.expect(2);
            test.equal(e.code, 404);
            test.equal(r, false);
            test.done();
        });
    },

    noThisGuy: function (test) {
        var p = {
            uid: 'nobody@host',
            pwd: 'abcdefg'
        };
        service('/auth', 'post', {}, p, function (e, r) {
            test.expect(2);
            test.equal(e.code, 404);
            test.equal(r, false);
            test.done();
        });
    },

    noParams: function (test) {
        service('/auth', 'post', {}, {}, function (e, r) {
            test.expect(2);
            test.equal(e.code, 400);
            test.equal(r, false);
            test.done();
        });
    },

    badParams: function (test) {
        service('/auth', 'post', {}, { foo: 'foo', bar: 'bar' }, function (e, r) {
            test.expect(2);
            test.equal(e.code, 400);
            test.equal(r, false);
            test.done();
        });
    }
};