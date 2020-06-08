const fs = require('fs');
const operations = require('./operations');

module.exports = {
        async getFollowers() {
            if (!fs.existsSync('./src/resources/followers.json')) {
                return false;
            } else {
                let followers = fs.readFileSync('./src/resources/followers.json').toString();
                return JSON.parse(followers);
            }
        },

        async saveFollowers(client) {
            if (fs.existsSync('./src/resources/followers.json')) {
                fs.unlinkSync('./src/resources/followers.json');
            }
            const userId = await this.getUserId();
            const followers = await operations.getFollowers(userId, client);
            fs.writeFileSync('./src/resources/followers.json', JSON.stringify(followers));
            return true
        },

        async getFollowings() {
            if (!fs.existsSync('./src/resources/followings.json')) {
                console.log('Followings.json não encontrado, sincronizar novamente...');
            } else {
                let followings = fs.readFileSync('./src/resources/followings.json').toString();
                return JSON.parse(followings);
            }
        },

        async saveFollowings(client) {
            if (fs.existsSync('./src/resources/followings.json')) {
                fs.unlinkSync('./src/resources/followings.json');
            }
            const userId = await this.getUserId();
            const followings = await operations.getFollowings(userId,client);
            fs.writeFileSync('./src/resources/followings.json', JSON.stringify(followings));
        },

        async getUserId() {
            let user = fs.readFileSync('./src/resources/user.json').toString();
            let userId = JSON.parse(user).id;
            return userId;
        },

        async saveUserInfo(user) {
            if (fs.existsSync('./src/resources/user.json')) {
                fs.unlinkSync('./src/resources/user.json');
            } 
            fs.writeFileSync('./src/resources/user.json', JSON.stringify(user), 'utf8')
        },

        async getUserInfo() {
            if (!fs.existsSync('./src/resources/user.json')) {
                console.log('User.json nao encontrado, sincronizar novamente...');
            } else {
                const user = fs.readFileSync('./src/resources/user.json').toString();
                return JSON.parse(user);
            }
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
        },

        async synchronize() {
            const localStorageClient = window.localStorage.getItem('client');
            const client = JSON.parse(localStorageClient);
            const { buildLoader } = require('../utils/buildFollowerDiv');
            const loader = buildLoader.create();
            buildLoader.show(loader);
        
            console.log('Iniciando a sincronização com o instagram...');
            console.log('Salvando os followers..')
            await this.saveFollowers(client);
            console.log('Followers salvo com sucesso.')
            console.log('Salvando os followings..')
            await this.saveFollowings(client);
            console.log('Followings salvo com sucesso.')
            console.log('Sincronização realizada com sucesso.');

            buildLoader.dismiss(loader);
        }
}