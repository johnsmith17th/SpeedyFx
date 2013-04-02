var model = require('../model');
var error = require('../../error');

var filter = { _id: 0 };

function getMessage(params, callback) {
    console.log('GET /message');

    var q = model.Q({ uid: 1, mid: 0 }, params),
        f = model.F(filter, params);

    model.Message.find(q, f, function (err, doc) {
        if (err) callback(error.e503);
        else callback(err, doc);
    });
}

function postMessage(params, callback) {
    console.log('POST /message');

    var m = new model.Message(params);
    m.save(function (err, doc) {
        if (err) callback(error.e503);
        else callback();
    });
}

function delMessage(params, callback) {
    console.log('DELETE /message');

    var q = model.Q({ uid: 1, mid: 0 }, params);

    model.Message.remove(q, f, function (err) {
        if (err) callback(error.e503);
        else callback();
    });
}

module.exports = {

    get: getMessage,
    post: postMessage,
    del: delMessage
};