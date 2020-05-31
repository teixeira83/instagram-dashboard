const fs = require('fs');
const operations = require('./operations');

module.exports = {
        async getFollowers() {
            if (!fs.existsSync('./src/resources/followers.json')) {
                await this.saveFollowers();
            }

            let followers = fs.readFileSync('./src/resources/followers.json').toString();

            return JSON.parse(followers);
        },

        async saveFollowers() {

            let userId = await this.getUserId();
            let followers = await operations.getFollowers(userId);

            fs.writeFileSync('./src/resources/followers.json', JSON.stringify(followers));
        },

        async getFollowings() {
            if (!fs.existsSync('./src/resources/followings.json')) {
                await this.saveFollowings();
            }

            let followings = fs.readFileSync('./src/resources/followings.json').toString();

            return JSON.parse(followings);
        },

        async saveFollowings() {
            let userId = await this.getUserId();
            let followings = await operations.getFollowings(userId);

            fs.writeFileSync('./src/resources/followings.json', JSON.stringify(followings));
        },

        async getUserId() {

            let user = fs.readFileSync('./src/resources/user.json').toString();

            let userId = JSON.parse(user).id;

            return userId;
        },

        async saveUserInfo() {

            const user = await operations.login().then(res => {
                let user = {
                    name: res.username,
                    pub: res.edge_owner_to_timeline_media.count,
                    followers: res.edge_followed_by.count,
                    following: res.edge_follow.count,
                    picture: res.profile_pic_url,
                    id: res.id
                }

                return user;
            });

            fs.writeFileSync('./src/resources/user.json', JSON.stringify(user), 'utf8')
        },

        async getUserInfo() {
            if (!fs.existsSync('./src/resources/user.json')) {
                await this.saveUserInfo();
            }

            let user = fs.readFileSync('./src/resources/user.json').toString();

            return JSON.parse(user);
        },

        async getFollowingByUsername(username){
            if (!fs.existsSync('./src/resources/followings.json')) {
                await this.saveFollowings();               
            }           
            
            let followingsJson = fs.readFileSync('./src/resources/followings.json').toString();
            let followings = JSON.parse(followingsJson);
            
            for (const f of followings) {
                if (f.username === username) {
                    return f;
                }
            }
            
            return false;
        }
}