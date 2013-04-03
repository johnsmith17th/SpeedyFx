var index = require('../index');
var service = index.service(index.MongoAccess);

module.exports['POST /contact'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    post: function (test) {
        service('/contact', 'post', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 404);
            test.done();
        });
    }
};

module.exports['PUT /contact'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    put: function (test) {
        p = { uid: 'johnsmith', cid: 'jackjohns', black: false };
        service('/contact', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/contact', 'put', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    setAlias: function (test) {
        p = { uid: 'johnsmith', cid: 'jane', alias: 'Janny', black: false };
        service('/contact', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    setBlack: function (test) {
        p = { uid: 'johnsmith', cid: 'badguy', black: true };
        service('/contact', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    setOthers: function (test) {
        p = { uid: 'johnsmith', cid: 'jackjohns', other: 'something', black: true };
        service('/contact', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    toDelete: function (test) {
        p = { uid: 'johnsmith', cid: 'nobody', black: true };
        service('/contact', 'put', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    }
};

module.exports['DEL /contact'] = {
    
    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    del: function (test) {
        p = { uid: 'johnsmith', cid: 'nobody' };
        service('/contact', 'delete', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    nothing: function (test) {
        p = { uid: 'somebody', cid: 'nobody' };
        service('/contact', 'delete', p, function (e, r) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/contact', 'delete', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['GET /contact'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/contact', 'get', { uid: 'johnsmith' }, function (e, r) {
            test.expect(2);
            test.equal(null, e);
            test.notEqual(null, r);
            test.done();
        });
    },

    blackFalse: function (test) {
        service('/contact', 'get', { uid: 'johnsmith', black: false }, function (e, r) {
            test.expect(2);
            test.equal(null, e);
            test.notEqual(null, r);
            test.done();
        });
    },

    blackTrue: function (test) {
        service('/contact', 'get', { uid: 'johnsmith', black: true }, function (e, r) {
            test.expect(2);
            test.equal(null, e);
            test.notEqual(null, r);
            test.done();
        });
    },

    withFilter: function (test) {
        service('/contact', 'get', { uid: 'johnsmith', filter: '-_id,uid,cid' }, function (e, r) {
            test.expect(2);
            test.equal(null, e);
            test.notEqual(null, r);
            test.done();
        });
    },

    nothing: function (test) {
        service('/contact', 'get', { uid: 'nobody' }, function (e, r) {
            test.expect(2);
            test.equal(null, e);
            test.notEqual(null, r);
            test.done();
        });
    },

    noParams: function (test) {
        service('/contact', 'get', { }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }

};