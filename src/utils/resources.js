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
    }
}
