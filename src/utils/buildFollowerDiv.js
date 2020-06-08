module.exports = {
    buildFollowerDiv(person) {
        let newBigDiv = document.createElement('div');
        newBigDiv.className = 'follower';
        
        let newImg = document.createElement('img');
        newImg.src = person.profile_pic_url;
        
        let newSmallDiv = document.createElement('div');
        newSmallDiv.className = 'follower-information';
        
        let newSpanName = document.createElement('span');
        newSpanName.id = 'fullname';
        newSpanName.textContent = person.full_name;

        let newSpanUsername = document.createElement('span');
        newSpanUsername.id = "username";
        newSpanUsername.textContent = `@${person.username}`;
        
        
    
        newBigDiv.appendChild(newImg);
        newSmallDiv.appendChild(newSpanName);
        newSmallDiv.appendChild(newSpanUsername);
        newBigDiv.appendChild(newSmallDiv);

        return newBigDiv;
    },

    buildPubDiv(pub) {
        let newBigDiv = document.createElement('div');
        newBigDiv.className = 'publish';

        let newImg = document.createElement('img');
        newImg.src = pub['node']['display_url'];

        newBigDiv.appendChild(newImg);

        return newBigDiv;
    },

    buildLoader: {  
        create() {
            let loader = document.createElement('div');
            loader.className = 'loader';
            loader.id='loader'
            return loader;
        },
        
        show(loader) {
            let [body] = document.getElementsByTagName('body');
            body.insertAdjacentHTML('afterbegin', loader.outerHTML);
        },
        
        dismiss() {
            let [body] = document.getElementsByTagName('body');
            let loader = document.getElementById('loader');
            body.removeChild(loader);
        }
    },

    buildButtonUnfollow (){
        let button = document.createElement('button');
        button.className = 'mybtn';
        button.textContent = 'UNFOLLOW';
        return button;
    }
}