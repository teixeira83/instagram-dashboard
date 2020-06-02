const resources = require('../../../utils/resources');

;(async () => {
    window.onload = loadCounters;    
    const user = await resources.getUserInfo();

    let imgProfile = document.getElementById('img-profile');
    let profileUsername = document.getElementById('profile-username');
    let username = document.getElementById('username');
    let countPub = document.getElementById('pub-count');
    let countFollower = document.getElementById('follower-count');
    let countFollowing = document.getElementById('following-count');
    
    imgProfile.src = user.picture;
    profileUsername.innerHTML = user.name;
    username.innerHTML = `@${user.name}`;
    countPub.innerHTML = user.pub;
    countFollower.innerHTML = user.followers;
    countFollowing.innerHTML = user.following;
    
})()

async function loadCounters() {
    const user = await resources.getUserInfo();
    
    loadCounterPub(user.pub);
    loadCounterFollowers(user.followers);
    loadCounterFollowing(user.following);
}

async function loadCounterFollowing(following){
    
    let countFollowing = document.getElementById('following-count');
    
    for( let i = 0; i <= following; i++ ){
        await new Promise(r => setTimeout(r, 5))
        countFollowing.innerHTML = i;
    }
}

async function loadCounterFollowers(followers) {
    let countFollower = document.getElementById('follower-count');
    
    for( let i = 0; i <= followers; i++ ){
        await new Promise(r => setTimeout(r, 5))
        countFollower.innerHTML = i;
    }
}

async function loadCounterPub(pub) {
    let countPub = document.getElementById('pub-count');
    
    for( let i = 0; i <= pub; i++ ){
        await new Promise(r => setTimeout(r, 5))
        countPub.innerHTML = i;
    }   
}