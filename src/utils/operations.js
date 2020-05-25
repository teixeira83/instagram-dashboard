const { username, password } = require('dotenv').config().parsed;
const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');

const cookieStore = new FileCookieStore('../cookies.json');
const client = new Instagram({ username, password, cookieStore });

module.exports = {
    async login() {

        await client.login();
        const me = await client.getUserByUsername({ username });

        console.log(me.id)
        return me
    },

    async getFollowers(id) {
        
        let followers = [];
        let nextPage = true;
        let endCursor = '';

        while(nextPage) {
            let responseFollowers = await client.getFollowers({ userId: id, first: 20, after: endCursor});
            nextPage = responseFollowers.page_info.has_next_page;
            endCursor = responseFollowers.page_info.end_cursor;

            for (f of responseFollowers.data) {
                followers.push(f);
            }
        }

        return followers;
    }
}