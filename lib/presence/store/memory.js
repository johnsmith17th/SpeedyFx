var MemoryStore = module.exports = (function () {

    var data = {};

    function create() {
        return { prs: {}, sub: {} };
    }

    function get(uid, callback) {
        callback(null, data[uid].prs);
    }

    function query(arr, callback) {
        var uid, r = {};
        for (var i in arr) {
            uid = arr[i];
            if (data[uid] && Object.keys(data[uid].prs).length > 0)
                r[uid] = data[uid].prs;
        }
        callback(null, r);
    }

    function register(uid, cid, status, callback) {
        if (data[uid] === undefined)
            data[uid] = create();
        data[uid].prs[cid] = { status: status, time: Date.now() };
        callback(null);
    }

    function unregister(uid, cid, callback) {
        if (data[uid] && data[uid].prs[cid])
            delete data[uid].prs[cid];
        callback(null);
    }

    function subscribe(cid, arr, callback) {
        var uid;
        for (var i in arr) {
            uid = arr[i];
            if (data[uid] === undefined)
                data[uid] = create();
            data[uid].sub[cid] = 1;
        }
        callback(null);
    }

    function unsubscribe(cid, arr, callback) {
        var uid;
        for (var i in arr) {
            uid = arr[i];
            if (data[uid])
                delete data[uid].sub[cid];
        }
        callback(null);
    }

    function subscriber(uid, callback) {
        if (data[uid])
            callback(null, Object.keys(data[uid].sub));
        else callback(null, []);
    }

    function clear(callback) {
        data = {};
        callback(null);
    }

    return {
        get: get,
        query: query,
        register: register,
        unregister: unregister,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        subscribers: subscriber,
        clear: clear
    };
})();