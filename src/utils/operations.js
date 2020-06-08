// const { username, password } = require('dotenv').config().parsed;
const Instagram = require('instagram-web-api');
const fs = require('fs')
module.exports = {    
    async login(username, password) {
        const client = new Instagram({ username, password });
        const responseLogin = await client.login();
        /*
            fake login para nao ficar fazendo
            requisicao toda hora para testar
            o comportamento do programa
        */
       
        // const fakeClient = fs.readFileSync('./src/resources/fakeClient.json').toString();
        // const fakeResponseLogin = fs.readFileSync('./src/resources/fakeResponseLogin.json').toString();
       /*
        fim do fake client
       */
        // return [JSON.parse(fakeClient),JSON.parse(fakeResponseLogin)];
        return [client,responseLogin];
    },

    async getFollowers(client) {
        const id = client.credentials.id;
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

    async unfollow(id) {
        let client = this.getClient();
        try {
            await (await client).unfollow({ userId: id});
            return true;
        }
        catch (err) {
            return false;
        }
    }
}