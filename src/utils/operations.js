// const { username, password } = require('dotenv').config().parsed;
const Instagram = require('instagram-web-api');

module.exports = {    
    async login(username, password) {
        const client = new Instagram({ username, password });
        const responseLogin = await client.login();
        return [client,responseLogin];
    },

    async getFollowers(id,c) {
        const username = c.credentials.username;
        const password = c.credentials.password;    
        const client = new Instagram({ username, password });
        await client.login();
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
            await this.sleepRequest();
        }

        return followers;
    },

    async getFollowings(id,c) {
        const username = c.credentials.username;
        const password = c.credentials.password;    
        const client = new Instagram({ username, password });
        await client.login();
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
            await this.sleepRequest();
        }

        return followings;
    },

    async getFeed(username) {
        let client = new Instagram({ username })
        let user = await client.getUserByUsername({ username })
        
        let pubs = user.edge_owner_to_timeline_media;   
        
        return pubs.edges;
    },

    async getUser(client) {
        const username = client.credentials.username;
        const response = await client.getUserByUsername({ username });
        const user = {
            name: response.username,
            pub: response.edge_owner_to_timeline_media.count,
            followers: response.edge_followed_by.count,
            following: response.edge_follow.count,
            picture: response.profile_pic_url,
            id: response.id
        }
        return user;
    },

    async unfollow(id,c) {
        const username = c.credentials.username;
        const password = c.credentials.password;    
        const client = new Instagram({ username, password });
        await client.login();
        try {
            await client.unfollow({ userId: id});
            return true;
        }
        catch (err) {
            return false;
        }
    },

    async sleepRequest() {
        await new Promise(r => setTimeout(r, 200));
    }
}