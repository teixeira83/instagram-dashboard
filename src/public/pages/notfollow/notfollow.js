const createDiv = require('../../../utils/buildFollowerDiv');
const resources = require('../../../utils/resources');
const operations = require('../../../utils/operations');
const { buildLoader } = require('../../../utils/buildFollowerDiv');

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
    loadFollowings();
    async function loadFollowings() {
        await cleanFollowings();
        
        for ( let i = 0; i < notFollow.length ; i++) {
            
            let newDiv = createDiv.buildFollowerDiv(notFollow[i]);
            let followerDiv = newDiv.lastChild;
            let button = createDiv.buildButtonUnfollow();
            button.onclick = unfollow;
            followerDiv.appendChild(button);
            let [divNotFollow] = document.getElementsByClassName('container-followers')
            divNotFollow.appendChild(newDiv);
        }
    }

    async function unfollow(follower) {
        let loader = buildLoader.create();
        buildLoader.show(loader);

        let followerDiv = follower.path[1];
        let username = followerDiv.children[1].textContent;
        username = username.replace('@', '');
        let id
        for (const f of notFollow) {
            if ( f.username == username) {
                id = f.id;
                break;
            }
        }
        let response = await operations.unfollow(id);
        if(response) {
            for (const f of notFollow) {
                if ( f.username == username) {
                    notFollow.splice(notFollow.indexOf(f),1)
                    loadFollowings();
                    break;
                }
            }   
        } else {
            alert('Ocorreu um erro, favor tentar novamente...');
        }
        buildLoader.dismiss(loader);
    }

    function cleanFollowings() {
        let [containerFollowing] = document.getElementsByClassName('container-followers');
        while (containerFollowing.firstChild) {
            containerFollowing.removeChild(containerFollowing.firstChild);
        }
    }
})()