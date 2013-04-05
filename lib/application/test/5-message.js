var service = require('../index').service;

module.exports['POST /user/message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    normal: function (test) {
        var p = {
            message: {
                type: 'msg',
                data: { id: 'a', from: 'somebody@host', to: 'johnsmith@host', body: 'hi' }
            }
        };
        service('/user/message', 'post', {}, p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    again: function (test) {
        var p = {
            message: {
                type: 'msg',
                data: { id: 'b', from: 'anotherone@host', to: 'johnsmith@host', body: 'hi' }
            }
        };
        service('/user/message', 'post', {}, p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    forDelete: function (test) {
        var p = {
            message: {
                type: 'msg',
                data: { id: 'c', from: 'nobody@host', to: 'johnsmith@host', body: 'hi' }
            }
        };
        service('/user/message', 'post', {}, p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/user/message', 'post', {}, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['GET /user/message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/user/message', 'get', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 3);
            test.done();
            console.log(r);
        });
    },

    nothing: function (test) {
        service('/user/message', 'get', { uid: 'nobody@host' }, {}, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 0);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/message', 'get', {}, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['DELETE /user/message'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    delMid: function (test) {
        service('/user/message', 'delete', { uid: 'johnsmith@host' }, { mid: 'c' }, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    delAll: function (test) {
        service('/user/message', 'delete', { uid: 'johnsmith@host' }, {}, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    nothing: function (test) {
        service('/user/message', 'delete', { uid: 'nobody@host' }, {}, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noSession: function (test) {
        service('/user/message', 'delete', {}, {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};