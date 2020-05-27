const fs = require('fs');
const operations = require('./operations');

module.exports = {
    async saveFollowers() {
    
        let userId = await this.getUserIdFromCookies();
        let followers = await operations.getFollowers(userId);
        
        fs.writeFileSync('./src/resources/followers.json', JSON.stringify(followers));
    },

    async getUserIdFromCookies() {
        
        let cookiesFile = fs.readFileSync('./cookies.json').toString();

        let cookies = JSON.parse(cookiesFile);

        let userId = cookies['instagram.com']['/']['ds_user_id'].value;
        
        return userId;
    },

    async saveUserInfo() {
        
        const user = await operations.login().then(res => {
            let user = {
                name: res.username,
                pub: res.edge_owner_to_timeline_media.count,
                followers: res.edge_followed_by.count,
                following: res.edge_follow.count,
                picture: res.profile_pic_url
            }
        
            return user;
        });

        fs.writeFileSync('./src/resources/user.json', JSON.stringify(user), 'utf8')
    },

    async getUserInfo(){

        if ( fs.existsSync('./src/resources/user.json') ) {
            let user = fs.readFileSync('./src/resources/user.json').toString();
            
            return JSON.parse(user);
        } else {
            await saveUserInfo();
        }
    }
}
