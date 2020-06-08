const operations = require('../../../utils/operations');
const resources = require('../../../utils/resources');
const { buildLoader } = require('../../../utils/buildFollowerDiv');

window.onload = getForm();

function getForm() {
    window.localStorage.clear();
    const form = document.getElementById('form-login');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loader = buildLoader.create();
        buildLoader.show(loader);

        const username = document.getElementById('login');
        const password = document.getElementById('password');
        try {
            const [client, responseLogin] = await operations.login(username.value,password.value);
            if (responseLogin.authenticated) {
                const user = await operations.getUser(client);
                await resources.saveUserInfo(user);
                localStorage.setItem('client', JSON.stringify(client));
                window.location.href = '../home/home.html';
                buildLoader.dismiss(loader);
            }else{
                buildLoader.dismiss(loader);
                alert('login ou senha incorretos...');
            }
        } catch (err) {
            buildLoader.dismiss(loader);
            console.log(err)
            alert(err)
        }
    });
}
