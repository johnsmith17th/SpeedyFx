var model = require('../model');

var filter = { _id: 0 };

function getContact(params, callback) {
    console.log('GET /contact');

    var q = model.Q({ uid: 1, black: 0 }, params),
        f = model.F(filter, params);

    model.Contact.find(q, f, function (err, doc) {
        if (err) callback(model.errors.e503);
        else callback(err, doc);
    });
}

function putContact(params, callback) {
    console.log('PUT /contact');

    var q = model.Q({ uid: 1, cid: 1 }, params),
        s = model.S({ alias: 1, black: 1 }, params);

    model.Contact.update(q, s, { upsert: true }, function (err) {
        if (err) callback(model.errors.e503);
        else callback();
    });
}

function delContact(params, callback) {
    console.log('DELETE /contact');

    var q = model.Q({ uid: 1, cid: 1 }, params);
    model.Contact.remove(q, function (err) {
        if (err) callback(model.errors.e503);
        else callback();
    });
}

module.exports = {

    get: getContact,
    put: putContact,
    del: delContact
};