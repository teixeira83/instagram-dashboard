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
    
    const followings = await resources.getFollowings();

    let notFollow = [];
    
    for (let i = 0; i < followings.length; i++) {
        let aux = 0
        
        for (let j = 0; j < followers.length; j++){
            if(followings[i].id === followers[j].id){
                aux++;
                break;
            }
        }

        if ( aux === 0 ) {
            notFollow.push(followings[i]);
        }

        aux = 0;
        
    }

    for ( let i = 0; i < notFollow.length ; i++) {
        
        let newDiv = createDiv.buildFollowerDiv(notFollow[i]);
        let followerDiv = newDiv.lastChild;
        let button = createDiv.buildButtonUnfollow();
        followerDiv.insertAdjacentHTML('beforeend', button.outerHTML );
        let [divNotFollow] = document.getElementsByClassName('container-followers')
    
        divNotFollow.insertAdjacentHTML('beforeend', newDiv.outerHTML);

    }
})()