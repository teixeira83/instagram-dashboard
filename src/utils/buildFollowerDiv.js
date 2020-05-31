module.exports = {
    buildFollowerDiv(person) {
        let newBigDiv = document.createElement('div');
        newBigDiv.className = 'follower';
        
        let newImg = document.createElement('img');
        newImg.src = person.profile_pic_url;
        
        let newSmallDiv = document.createElement('div');
        
        let newSpanUsername = document.createElement('span');
        newSpanUsername.id = "boardUsername"
        newSpanUsername.textContent = person.username;
        
        let newSpanName = document.createElement('span');
        newSpanName.textContent = person.full_name;
    
        newBigDiv.appendChild(newImg);
        newSmallDiv.appendChild(newSpanUsername);
        newSmallDiv.appendChild(newSpanName);
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
            console.log('criar')
            let loader = document.createElement('div');
            loader.className = 'loader';
            loader.id='loader'
            return loader;
        },
        
        show(loader) {
            console.log('show')
            let [body] = document.getElementsByTagName('body');
            body.insertAdjacentHTML('afterbegin', loader.outerHTML);
        },
        
        dismiss() {
            let [body] = document.getElementsByTagName('body');
            let loader = document.getElementById('loader');
            body.removeChild(loader);
        }
    }
}