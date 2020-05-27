const operations = require('../../../utils/operations');
const resources = require('../../../utils/resources');

;(async () => {
    

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