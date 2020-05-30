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
        await client.login();
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
    },

    async getFollowings(id) {
        let client = await this.getClient();
        let followings = [];
        let nextPage = true;
        let endCursor = '';

        while(nextPage) {
            let responseFollowings = await client.getFollowings({ userId: id, first: 20, after: endCursor});
            nextPage = responseFollowings.page_info.has_next_page;
            endCursor = responseFollowings.page_info.end_cursor;

            for (f of responseFollowings.data) {
                followings.push(f);
            }
        }

        return followings;
    },

    async getFeed(username) {
        let client = await new Instagram({ username })
        let user = await client.getUserByUsername({ username })
        console.log(user)
        let pubs = user.edge_owner_to_timeline_media;   
        
        return pubs.edges;
    }
}