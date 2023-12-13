const Players = require('../model/player')

module.exports = {
    async index(req, res) {
        return res.json(Players);
    }
};