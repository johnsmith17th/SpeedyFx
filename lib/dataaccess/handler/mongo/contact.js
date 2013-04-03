var model = require('./model');
var error = require('../../../error');

var filter = { _id: 0 };

function getContact(params, callback) {
    //console.log('GET /contact');

    var q = model.Q({ uid: 1, black: 0 }, params),
        f = model.F(filter, params);

    if (q == null)
        return callback(error.e400);

    model.Contact.find(q, f).lean().exec(function (err, doc) {
        if (err) callback(error.e503);
        else callback(err, doc);
    });
}

function putContact(params, callback) {
    //console.log('PUT /contact');

    var q = model.Q({ uid: 1, cid: 1 }, params),
        s = model.Q({ uid: 1, cid: 1, alias: 0, black: 1 }, params);

    if (q == null || s == null)
        return callback(error.e400);

    model.Contact.update(q, s, { upsert: true, multi: true }, function (err) {
        if (err) callback(error.e503);
        else callback();
    });
}

function delContact(params, callback) {
    //console.log('DELETE /contact');

    var q = model.Q({ uid: 1, cid: 1 }, params);

    if (q == null)
        return callback(error.e400);

    model.Contact.remove(q, function (err) {
        if (err) callback(error.e503);
        else callback();
    });
}

module.exports = {

    get: getContact,
    put: putContact,
    del: delContact
};