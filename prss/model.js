var presence = module.exports = (function () {

    var data = {};

    function u() {
        return { prs: {}, sub: {} };
    }

    function reg(uid, cid, status) {
        if (data[uid] === undefined)
            data[uid] = u();
        data[uid].prs[cid] = { status: status, time: Date.now() };
    }

    function unreg(uid, cid) {
        if (data[uid] && data[uid].prs[cid])
            delete data[uid].prs[cid];
    }

    function get(uid) {
        return data[uid].prs;
    }

    function query(arr) {
        var uid, r = [];
        for (var i in arr) {
            uid = arr[i];
            if (data[uid] && Object.keys(data[uid].prs).length > 0)
                r.push(data[uid].prs);
        }
        return r;
    }

    function sub(cid, arr) {
        var uid;
        for (var i in arr) {
            uid = arr[i];
            if (data[uid] === undefined)
                data[uid] = u();
            data[uid].sub[cid] = 1;
        }
    }

    function unsub(cid, arr) {
        var uid;
        for (var i in arr) {
            uid = arr[i];
            if (data[uid])
                delete data[uid].sub[cid];
        }
    }

    function subOf(uid) {
        if (data[uid])
            return Object.keys(data[uid].sub);
        else return [];
    }

    return {
        get: get,
        query: query,
        register: reg,
        unregister: unreg,
        subscribe: sub,
        unsubscribe: unsub,
        subscribers: subOf
    };
})();