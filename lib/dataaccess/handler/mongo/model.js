var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Schemas
 */

var UserSchema = new Schema({
    uid: { type: String, required: true, index: { unique: true, dropDups: true} },
    pwd: { type: String, required: true, select: false },
    nick: { type: String, required: true },
    email: { type: String, required: true },
    gender: String,
    image: String,
    status: String,
    addres: String,
    phone: String
});

var ContactSchema = new Schema({
    uid: { type: String, required: true, index: true },
    cid: { type: String, required: true, index: true },
    alias: { type: String, 'default': '' },
    black: { type: Boolean, 'default': false }
});

var MessageSchema = new Schema({    
    uid: { type: String, required: true, index: true },
    mid: { type: String, required: true, index: true },
    msg: { type: String, required: true },
    time: { type: String, required: true, 'default': Date.now }
});

/**
 * Models
 */

var User = module.exports.User = mongoose.model('user', UserSchema);
var Contact = module.exports.Contact = mongoose.model('contact', ContactSchema);
var Message = module.exports.Message = mongoose.model('message', MessageSchema);

module.exports.Q = function Q(fields, params) {

    var r = {};
    for (var i in fields) {
        // required condition
        if (fields[i]) {
            if (params[i] === undefined) return null;
            else r[i] = params[i];
        }
        // optional condition
        else {
            if (params[i] != undefined)
                r[i] = this.params[i];
        }
    }
    return r;
};

module.exports.F = function F(def, params) {
    if (params.filter)
        return params.filter.replace(/,/g, ' ');
    else return def;
};

module.exports.S = function S(fields, params) {

    var r = {};
    for (var i in fields) {
        // required fields
        if (fields[i]) {
            if (params[i] === undefined) return null;
            else r[i] = params[i];
        }
        // optional fields
        else {
            if (params[i] != undefined)
                r[i] = this.params[i];
        }
    }
    return { $set: r };
};

module.exports.asArray = function asArray(doc, field) {
    var r = [];
    doc.forEach(function (obj, index, array) {
        if (obj[field] != undefined) r.push(obj[field]);
    });
    return r;
};

module.exports.toArray = function toArray(doc) {

};