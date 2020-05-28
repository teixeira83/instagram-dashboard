const operations = require('../../../utils/operations');
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
    
    const followers = await resources.getFollowers();
    
    
    for ( let i = 0; i < followers.length ; i++) {
       
        let newDiv = createDiv.buildFollowerDiv(followers[i]);
    
        let [divFollowers] = document.getElementsByClassName('container-followers')
    
        divFollowers.insertAdjacentHTML('beforeend', newDiv.outerHTML);

    }

})()
