var request = require('request');
var cfg;
code = (req, res) => {
    if (req.query.code) {
        getToken(req, req.query.code).then(getUser).then((data) => {
            req.session.name = data['display_name'];
            req.session.id = data['_id'];
            res.redirect('../');
        });
    }
    else {
        res.redirect('../');
    }
}
getToken = (req, code) => {
    return new Promise((resolve, reject) => {
        var qs = {
            client_id: cfg['twitch_id'],
            client_secret: cfg['twitch_key'],
            grant_type: 'authorization_code',
            redirect_uri: cfg["twitch_redirect"],
            code: req.query.code
        };
        request.post({ url: 'https://api.twitch.tv/kraken/oauth2/token', qs }, (err, resp, body) => {
            var toks = JSON.parse(body);
            req.session.token = toks.access_token;
            resolve(toks.access_token);
        });
    });
}

getUser = (token) => {
    return new Promise((resolve, reject) => {
        request.get({ url: 'https://api.twitch.tv/kraken/user', headers: { Authorization: 'OAuth ' + token } }, (err, resp, body) => {
            resolve(JSON.parse(body));
        });
    });
}
function init(cfgs) { cfg = cfgs; return this; }
module.exports = {
    code: code,
    init: init
}

