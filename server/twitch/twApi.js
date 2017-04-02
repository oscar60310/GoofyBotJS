var cfg, twitch;
function re(req, res) {
    if (req.session.name == null) {
        res.status(403).send("You Must Login.");
    }
    else {
        switch (req.query.action) {
            case "JOIN":
                twitch.join("#" + req.session.name).then((data) => res.json(data));
                break;
            case "PART":
                twitch.part("#" + req.session.name).then((data) => res.json(data));
                break;
            default:
                res.status(404).end("Api Not Found.");
                break;
        }
    }

}

function init(cfgs, twit) { cfg = cfgs; twitch = twit; return this; }
module.exports = {
    init: init,
    re: re
}
