var express = require('express');
var http = require('http');
var fs = require('fs');
var session = require('express-session');
var app = express();

const cfg = JSON.parse(fs.readFileSync('./setting/config.json'));
var account = require('./account/login').init(cfg);
var port = process.env.port || 8000;
// 放靜態資源，也就是我們主要 html js 等等前端的東西
app.use('/', express.static('static'));
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