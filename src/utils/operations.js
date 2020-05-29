const { username, password } = require('dotenv').config().parsed;
const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');


module.exports = {
    async getClient() {
        const cookieStore = await new FileCookieStore('./cookies.json');
        const client = await new Instagram({ username, password, cookieStore });
        return client;
    },

    async login() {
        let client = await this.getClient();
        const me = await client.getUserByUsername({ username });
        return me
    },

    async getFollowers(id) {
        let client = await this.getClient();
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