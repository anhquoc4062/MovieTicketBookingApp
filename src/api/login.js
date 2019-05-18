import Global from '../../Globals';

const login = (username, password) => (
    fetch('http://'+Global.API+'/server/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
);

module.exports = login;