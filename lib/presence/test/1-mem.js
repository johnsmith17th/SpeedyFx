var index = require('../index');
var service = index.service(index.MemoryStore);

module.exports['PUT /presence'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    put: function (test) {
        service('/presence', 'put', { uid: 'smith', cid: 'android', status: 'online' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    again: function (test) {
        service('/presence', 'put', { uid: 'smith', cid: 'iphone', status: 'online' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    other: function (test) {
        service('/presence', 'put', { uid: 'jane', cid: 'iphone', status: 'online' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    otherAgain: function (test) {
        service('/presence', 'put', { uid: 'jack', cid: 'iphone', status: 'online' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    forDelete: function (test) {
        service('/presence', 'put', { uid: 'nobody', cid: 'unkonwn', status: 'hide' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/presence', 'put', {}, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['GET /presence'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/presence', 'get', { uid: 'smith' }, function (e, r) {
            test.expect(3);
            test.equal(e, null);            
            test.notEqual(r, null);
            test.notEqual(r, undefined);
            test.done();
        });
    },

    noParams: function (test) {
        service('/presence', 'get', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['DELETE /presence'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    notHappen: function (test) {
        service('/presence', 'delete', { uid: 'nobody', cid: 'some' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    stillNotHappen: function (test) {
        service('/presence', 'delete', { uid: 'somebody', cid: 'some' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    doHappen: function (test) {
        service('/presence', 'delete', { uid: 'nobody', cid: 'unkonwn' }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/presence', 'delete', {}, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['POST /presence/q'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    post: function (test) {
        service('/presence/q', 'post', { uid: ['smith', 'john', 'jane', 'jack', 'jackson'] }, function (e, r) {
            test.expect(6);
            test.notEqual(r, null);
            test.notEqual(r['smith'], undefined);
            test.notEqual(r['jane'], undefined);
            test.notEqual(r['jack'], undefined);
            test.equal(r['john'], undefined);
            test.equal(r['jakeson'], undefined);
            test.done();
        });
    },

    noParams: function(test) {
        service('/presence/q', 'post', { }, function (e, r) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    wrongParams: function(test) {
        service('/presence/q', 'post', { uid: 'bad' }, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['PUT /subscription'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    put: function (test) {
        service('/subscription', 'put', { cid: 'a', uid: ['smith', 'jack', 'jane', 'joke'] }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    again: function (test) {
        service('/subscription', 'put', { cid: 'b', uid: ['smith', 'jack', 'jane', 'joke'] }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/subscription', 'put', {}, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    wrongParams: function(test) {
        service('/subscription', 'put', { cid: 'b', uid: 'bad' }, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['GET /subscriber'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    get: function (test) {
        service('/subscriber', 'get', { uid: 'smith' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 2);
            test.done();
        });
    },

    nothing: function (test) {
        service('/subscriber', 'get', { uid: 'nobody' }, function (e, r) {
            test.expect(2);
            test.equal(e, null);
            test.equal(r.length, 0);
            test.done();
        });
    },

    noParams: function (test) {
        service('/subscriber', 'get', {}, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
};

module.exports['DELETE /subscription'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    del: function (test) {
        service('/subscription', 'delete', { cid: 'a', uid: ['jack', 'jane', 'joke'] }, function (e) {
            test.expect(1);
            test.equal(e, null);
            test.done();
        });
    },

    noParams: function (test) {
        service('/subscription', 'delete', { }, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    },

    wrongParams: function(test) {
        service('/subscription', 'delete', { cid: 'b', uid: 'bad' }, function (e) {
            test.expect(1);
            test.equal(e.code, 400);
            test.done();
        });
    }
}; 