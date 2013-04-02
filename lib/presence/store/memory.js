var MemoryStore = module.exports = (function () {

    var data = {};

    function create() {
        return { prs: {}, sub: {} };
    }

    function get(uid, callback) {
        callback(undefined, data[uid].prs);
    }

    function query(arr, callback) {
        var uid, r = [];
        for (var i in arr) {
            uid = arr[i];
            if (data[uid] && Object.keys(data[uid].prs).length > 0)
                r.push(data[uid].prs);
        }
        callback(undefined, r);
    }

    function register(uid, cid, status, callback) {
        if (data[uid] === undefined)
            data[uid] = create();
        data[uid].prs[cid] = { status: status, time: Date.now() };
        callback();
    }

    function unregister(uid, cid, callback) {
        if (data[uid] && data[uid].prs[cid])
            delete data[uid].prs[cid];
        callback();
    }

    function subscribe(cid, arr, callback) {
        var uid;
        for (var i in arr) {
            uid = arr[i];
            if (data[uid] === undefined)
                data[uid] = create();
            data[uid].sub[cid] = 1;
        }
        callback();
    }

    function unsubscribe(cid, arr, callback) {
        var uid;
        for (var i in arr) {
            uid = arr[i];
            if (data[uid])
                delete data[uid].sub[cid];
        }
        callback();
    }

    function subscriber(uid, callback) {
        if (data[uid])
            callback(undefined, Object.keys(data[uid].sub));
        else callback(undefined, []);
    }

    return {
        get: get,
        query: query,
        register: register,
        unregister: unregister,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        subscribers: subscriber
    };
})();