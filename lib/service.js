var dataAccess = module.exports.dataAccess = require('./dataaccess');
var presence = module.exports.presence = require('./presence');
var application = module.exports.application = require('./application');

module.exports.d = dataAccess.service();
module.exports.prs = presence.service();
module.exports.app = application.service();