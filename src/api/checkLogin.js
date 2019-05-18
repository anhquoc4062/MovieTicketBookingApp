import Global from '../../Globals';

const checkLogin = (token) => (
    fetch('http://'+Global.API+'/server/checktoken.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({token: token})
    })
    .then(res => res.json())
);

module.exports = checkLogin;