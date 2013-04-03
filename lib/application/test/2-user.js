var service = require('../index').service;

module.exports['GET /user'] = {

    setUp: function (callback) {
        callback();
    },

    tearDown: function (callback) {
        callback();
    }
};