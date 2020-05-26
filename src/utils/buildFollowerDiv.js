module.exports = {
    buildFollowerDiv(person) {
        let newBigDiv = document.createElement('div');
        newBigDiv.className = 'follower';
        
        let newImg = document.createElement('img');
        newImg.src = person.profile_pic_url;
        
        let newSmallDiv = document.createElement('div');
        
        let newSpanUsername = document.createElement('span');
        newSpanUsername.textContent = person.username;
        
        let newSpanName = document.createElement('span');
        newSpanName.textContent = person.full_name;
    
        newBigDiv.appendChild(newImg);
        newSmallDiv.appendChild(newSpanUsername);
        newSmallDiv.appendChild(newSpanName);
        newBigDiv.appendChild(newSmallDiv);

        return newBigDiv;
    }
}