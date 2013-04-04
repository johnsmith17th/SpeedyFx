var service = require('../index').service;

module.exports['PUT /user/blacklist'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        service('/user/blacklist', 'put', { uid: 'johnsmith@host' }, { cid: 'badguy@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    again: function (test) {
        service('/user/blacklist', 'put', { uid: 'johnsmith@host' }, { cid: 'reallybad@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    forDelete: function (test) {
        service('/user/blacklist', 'put', { uid: 'johnsmith@host' }, { cid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/blacklist', 'put', {}, { cid: 'dummy@host' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/blacklist', 'put', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['DELETE /user/blacklist'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        service('/user/blacklist', 'delete', { uid: 'johnsmith@host' }, { cid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    nothing: function (test) {
        service('/user/blacklist', 'delete', { uid: 'johnsmith@host' }, { cid: 'nothing@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/blacklist', 'delete', {}, { cid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/blacklist', 'delete', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    badParams: function (test) {
        service('/user/blacklist', 'delete', { uid: 'johnsmith@host' }, { foo: 'foo' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['GET /user/blacklist'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        service('/user/blacklist', 'get', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 0);
            test.done();
        });
    },

    nothing: function (test) {
        service('/user/blacklist', 'get', { uid: 'nothing@host' }, {}, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 0);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/blacklist', 'delete', {}, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};