var service = require('../index').service;

module.exports['PUT /user/contact'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        service('/user/contact', 'put', { uid: 'johnsmith@host' }, { cid: 'jackfrost@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    again: function (test) {
        service('/user/contact', 'put', { uid: 'johnsmith@host' }, { cid: 'easterbunny@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    forDelete: function (test) {
        service('/user/contact', 'put', { uid: 'johnsmith@host' }, { cid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    setAlias: function (test) {
        service('/user/contact', 'put', { uid: 'johnsmith@host' }, { cid: 'easterbunny@host', alias: 'Bunny' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/contact', 'put', {}, { cid: 'easterbunny@host' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/contact', 'put', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['DELETE /user/contact'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        service('/user/contact', 'delete', { uid: 'johnsmith@host' }, { cid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    nothing: function (test) {
        service('/user/contact', 'delete', { uid: 'johnsmith@host' }, { cid: 'nothing@host' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/contact', 'delete', {}, { cid: 'nobody@host' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/contact', 'delete', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    badParams: function (test) {
        service('/user/contact', 'delete', { uid: 'johnsmith@host' }, { foo: 'foo' }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['GET /user/contact'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        service('/user/contact', 'get', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 2);
            test.done();
        });
    },

    nothing: function (test) {
        service('/user/contact', 'get', { uid: 'nothing@host' }, {}, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 0);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/contact', 'delete', {}, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};