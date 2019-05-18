import Global from '../../Globals';

const register = (username, email, password) => (
    fetch('http://'+Global.API+'/server/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    })
    .then(res => res.text())
);

module.exports = register;