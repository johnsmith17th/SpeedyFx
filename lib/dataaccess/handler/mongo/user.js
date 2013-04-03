var model = require('./model');
var error = require('../../../error');

var filter = { _id: 0, pwd: 0, __v: 0 };

function getUser(params, callback) {
    //console.log('GET /user');

    var q = model.Q({ uid: 1, pwd: 0 }, params),
        f = model.F(filter, params);

    if (q == null)
        return callback(error.e400);

    model.User.findOne(q, f).lean().exec(function (err, doc) {
        if (err) callback(error.e503);
        else if (doc == null) callback(error.e404);
        else callback(err, doc);
    });
}

function postUser(params, callback) {
    //console.log('POST /user');

    var m = new model.User(params);
    m.save(function (err, doc) {
        if (err) callback(error.e503);
        else callback();
    });
}

function putUser(params, callback) {
    //console.log('PUT /user');

    var q = model.Q({ uid: 1 }, params),
        s = model.S({ nick: 0, gender: 0, image: 0, status: 0, address: 0, phone: 0 }, params);

    if (q == null || s == null)
        return callback(error.e400);

    model.User.update(q, s, function (err) {
        if (err) callback(error.e503);
        else callback();
    });
}

function putUserPwd(params, callback) {
    //console.log('PUT /user/pwd');

    var q = model.Q({ uid: 1, pwd: 1 }, params);
    if (q == null || params.value === undefined)
        return callback(error.e400);

    model.User.update(q, { $set: { pwd: params.value} }, function (err) {
        if (err) callback(error.e503);
        else callback();
    });
}

function postUserQ(params, callback) {
    //console.log('POST /user/q');

    if (!params.uids)
        return callback(error.e400);

    var q = { uid: { $in: params.uids} },
        f = model.F(filter, params);

    model.User.find(q, f).lean().exec(function (err, doc) {
        if (err) callback(error.e503);
        else callback(err, doc);
    });
}

module.exports = {

    get: getUser,
    post: postUser,
    put: putUser,

    pwd: {
        put: putUserPwd
    },

    q: {
        post: postUserQ
    }
};