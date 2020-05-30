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

})()

async function getFollowing(username) {
    
    let followingUser = await resources.getFollowingByUsername(username);
    
    let [divFollowingUser] = document.getElementsByClassName('container-followers')
    
    if (divFollowingUser.children.length > 0) {
       cleanAllDiv(divFollowingUser);
    } 

    if (followingUser != false) {
        let newDiv = createDiv.buildFollowerDiv(followingUser);
        divFollowingUser.insertAdjacentHTML('beforeend', newDiv.outerHTML);
        
        let [buttonContainer] = document.getElementsByClassName('buttons-conatiner');
        buttonContainer.style.display = 'flex';
    } else {
        let spanError = document.createElement('span');
        spanError.textContent = 'Usuário não encontrado...'
        divFollowingUser.insertAdjacentHTML('beforeend', spanError.outerHTML);
        
        let [buttonContainer] = document.getElementsByClassName('buttons-conatiner');
        buttonContainer.style.display = 'none';
    }
}

async function likePub(username){
    console.log(username)
    
}

async function getFeed(username) {
    let pubs = await operations.getFeed(username)
    console.log(pubs)
    let [divPubs] = document.getElementsByClassName('feed-container')

    if (divPubs.children.length > 0) {
        cleanAllDiv(divPubs);
    }
    for (let p of pubs){
        let newDiv = createDiv.buildPubDiv(p)    
        
        divPubs.insertAdjacentHTML('beforeend', newDiv.outerHTML);
    }

}

function cleanAllDiv(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}