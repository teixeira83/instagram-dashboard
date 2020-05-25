const operations = require('../../../utils/operations');

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
        let newBigDiv = document.createElement('div');
        newBigDiv.className = 'follower';
        
        let newImg = document.createElement('img');
        newImg.src = followers[i].profile_pic_url;
        
        let newSmallDiv = document.createElement('div');
        
        let newSpanUsername = document.createElement('span');
        newSpanUsername.textContent = followers[i].username;
        
        let newSpanName = document.createElement('span');
        newSpanName.textContent = followers[i].full_name;
    
        newBigDiv.appendChild(newImg);
        newSmallDiv.appendChild(newSpanUsername);
        newSmallDiv.appendChild(newSpanName);
        newBigDiv.appendChild(newSmallDiv);
    
        let [divFollowers] = document.getElementsByClassName('container-followers')
    
        divFollowers.insertAdjacentHTML('beforeend', newBigDiv.outerHTML);

    }

})()
