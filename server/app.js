var express = require('express');
var http = require('http');
var fs = require('fs');
const path = require('path');
var session = require('express-session');
var app = express();


const cfg = JSON.parse(fs.readFileSync('./setting/config.json'));
var account = require('./account/login').init(cfg);
var twitch = require('./twitch/twitch').init(cfg);
var twApi = require('./twitch/twApi').init(cfg,twitch);

var port = process.env.port || 8000;

app.use(session({
    secret: cfg["session_key"],
    cookie: { maxAge: 120 * 60 * 1000 },
    resave: true,
    saveUninitialized: true
}));


http.createServer(app).listen(port);
console.log('server started');

app.get("/api/checklogin", (req, res) => {
    res.setHeader("Content-type", "application/json");
    if (req.session.name) {

        res.end(JSON.stringify({ login: true, displayName: req.session.name }));
    }
    else {
        var url = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code";
        url += "&client_id=" + cfg['twitch_id'];
        url += "&redirect_uri=" + cfg["twitch_redirect"];
        url += "&scope=user_read";

        res.end(JSON.stringify({ login: false, loginUrl: url }));
    }
})

app.get("/api/code", account.code);

app.get('/client.min.js', (req, res) => {
    res.setHeader("Content-Type","text/javascript");
    res.sendFile(path.resolve(__dirname, '.', 'static', 'client.min.js'));
});
app.get('/api/twitch/*', twApi.re);
app.get('*', (req, res) => {
    res.setHeader("Content-Type","text/html");
    res.sendFile(path.resolve(__dirname, '.', 'static', 'index.html'));
});

twitch.connect();