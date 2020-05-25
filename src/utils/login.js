const { username, password } = require('dotenv').config().parsed;
const Instagram = require('instagram-web-api');

module.exports = {
    async login() {
        console.log(username)
        const client = new Instagram({username, password});

        const me = client.getUserByUsername({ username });

        return me
    }
}