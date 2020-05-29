const createDiv = require('../../../utils/buildFollowerDiv');
const resources = require('../../../utils/resources');

;(async () => {

    const user = await resources.getUserInfo();

    let imgProfile = document.getElementById('img-profile');
    let profileUsername = document.getElementById('profile-username');
    let username = document.getElementById('username');
    
    imgProfile.src = user.picture;
    profileUsername.innerHTML = user.name;
    username.innerHTML = `@${user.name}`;
    
    const followings = await resources.getFollowings();
    
    
    for ( let i = 0; i < followings.length ; i++) {
       
        let newDiv = createDiv.buildFollowerDiv(followings[i]);
    
        let [divFollowings] = document.getElementsByClassName('container-followers')
    
        divFollowings.insertAdjacentHTML('beforeend', newDiv.outerHTML);

    }

})()