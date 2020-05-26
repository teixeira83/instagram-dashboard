const operations = require('../../../utils/operations');
const createDiv = require('../../../utils/buildFollowerDiv');

;(async () => {

    const user = await operations.login().then(res => {
        console.log(res)
        let user = {
            id: res.id,
            name: res.username,
            pub: res.edge_owner_to_timeline_media.count,
            followers: res.edge_followed_by.count,
            following: res.edge_follow.count,
            picture: res.profile_pic_url
        }
    
        return user
    });


    let imgProfile = document.getElementById('img-profile');
    let profileUsername = document.getElementById('profile-username');
    let username = document.getElementById('username');
    
    imgProfile.src = user.picture;
    profileUsername.innerHTML = user.name;
    username.innerHTML = `@${user.name}`;
    
    const followers = await operations.getFollowers(user.id);
    
    
    for ( let i = 0; i < 10; i++) {
       
        let newDiv = createDiv.buildFollowerDiv(followers[i]);
    
        let [divFollowers] = document.getElementsByClassName('container-followers')
    
        divFollowers.insertAdjacentHTML('beforeend', newDiv.outerHTML);

    }

})()
