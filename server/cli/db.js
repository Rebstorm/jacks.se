"use strict";
// 1. Set an the env key in your CLI.
// 2. start open kv.
// 3. Do the shit you need to.
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var kv_ts_1 = require("../../constants/kv.ts");
var kv = await Deno.openKv("https://api.deno.com/databases/96006ea1-79ab-49f2-a9c3-a7bcbea56c30/connect");
// List highscore
var list = await kv.list({ prefix: [kv_ts_1.HIGHSCORE_DB_NAME] });
var users = [];
try {
    for (var _d = true, list_1 = __asyncValues(list), list_1_1; list_1_1 = await list_1.next(), _a = list_1_1.done, !_a; _d = true) {
        _c = list_1_1.value;
        _d = false;
        var res = _c;
        users.push(res.value);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = list_1.return)) await _b.call(list_1);
    }
    finally { if (e_1) throw e_1.error; }
}
// Delete.
/*
users.map(async (user, index) => {
  if (user.username.toLocaleLowerCase().indexOf("cap") > -1) {
    //await kv.delete([HIGHSCORE_DB_NAME, index + 1]);
    console.log("deleted", user);
  }
});

/*
// modify
user.map(async (user, index) => {
  if (user.username.length > 10) {
    user.username = user.username.substring(0, 7) + "...";
  }
  await kv.set([HIGHSCORE_DB_NAME, index + 1], user);
});
*/
