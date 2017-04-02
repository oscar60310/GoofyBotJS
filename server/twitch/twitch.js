var tmi = require("tmi.js");
var request = require('request');
var fs = require('fs');
var cfg;
var client;
var limit = {};

const MAXMESSAGE = 10; // max message per 30 seconds.
const reply_msg = JSON.parse(fs.readFileSync('./twitch/defaultReply.json'));


function connect() {
    var options = {
        options: {
            clientId: cfg["twitch_id"]
        },
        connection: {
            reconnect: true
        },
        identity: {
            username: cfg["bot_id"],
            password: cfg["bot_key"]
        },
        channels: ["#oscar60310"]
    };
    client = new tmi.client(options);
    // Connect the client to the server..
    client.connect().then((data) => {
        joinAll();
    });
    client.on("message", function (channel, userstate, message, self) {
        // Don't listen to my own messages..
        if (self) {
            return;
        }
        // Handle different message types..
        if (++limit[channel] > MAXMESSAGE) {
            console.log("[WARN] Limit the max message at " + channel);
            return;
        }
        switch (userstate["message-type"]) {
            case "action":
                // This is an action message..
                break;
            case "chat":
                checkIntent({message, userstate, channel }).then(reply);

                break;
            case "whisper":
                // This is a whisper..
                break;
            default:
                // Something else ?
                break;
        }
    });
}

function checkIntent(data) {
    return new Promise((resolve, reject) => {

        request.get(cfg["luis"] + encodeURI(data.message), (err, resp, body) => {
            var result = JSON.parse(body);
            if (result.topScoringIntent.score > 0.7) {
                data.intent = result.topScoringIntent.intent;
            }
            else {
                data.intetn = "None";
            }
            resolve(data);

        });
    });

}
function reply(data) {

    if (data.channel != ("#" + data.userstate['username']) && reply_msg[data.intent]) {

        var msg = reply_msg[data.intent][Math.floor(Math.random() * reply_msg[data.intent].length)];
        var repl = [{
            from: '%sender_display_name%',
            to: data.userstate['display-name']
        }];
        repl.map((obj, i) => {
            var re = new RegExp(obj.from, "g");
            msg = msg.replace(re, obj.to);
        });

        say(data.channel, msg);
    }
}
function joinAll() {
    const list = ['oscar60310','mamie30724']; // test

    list.map((user, i) => {
        join('#' + user);
        limit['#' + user] = 0;
    });
    resetLimit();
}
function resetLimit() {
    for (var n in limit) {
        limit[n] = 0;
    }
    setTimeout(resetLimit, 30000);
}

function join(id) {
    return new Promise((resolve, reject) => {
        client.join(id).then(function (data) {
            resolve({ finish: true });
        }).catch(function (err) {
            resolve({ finish: false, err });
        });
    });

}
function part(id) {
    return new Promise((resolve, reject) => {
        client.part(id).then(function (data) {
            resolve({ finish: true });
        }).catch(function (err) {
            resolve({ finish: false, err });
        });
    });

}
function say(id, msg) {
    return new Promise((resolve, reject) => {
        client.say(id, msg).then(function (data) {
            resolve({ finish: true });
        }).catch(function (err) {
            resolve({ finish: false, err });
        });
    });

}


function init(cfgs) { cfg = cfgs; return this; }
module.exports = {
    init: init,
    connect: connect,
    join: join,
    part: part
}
