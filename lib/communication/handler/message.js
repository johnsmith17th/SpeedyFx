function chat(app, socket, d) {
    
}

function group(app, socket, d) {
    
}

function channel(app, socket, d) {
    
}

var router = {
    'chat': chat,
    'group': group,
    'channel': channel
};

module.exports = function (app, socket, d) {
    if (d.body && d.body.context && router[d.body.context])
        router[d.body.context](app, socket, d);
};