function get_json(){
    return fetch('/token_bin.json', {
        method: 'GET'
    });
}

let access_token = '';

window.addEventListener('load', function () {
    get_json()
        .then(response => response.json())
        .then(json => {
            polling(json);
        })
        .catch(error => console.log(error));
});

setInterval(function() {
        if(access_token.length > 0) {
            getPlaylist(access_token)
                .then(response => response.json())
                .then(json => displayPlaylist(json))
                .catch(error => console.log(error))
        }
    }, 1000);

function polling(token_bin) {
    silent_refresh(token_bin)
        .then(response => response.json())
        .then(json => {
            access_token = json.access_token;
        })
        .catch(error => console.log(error));
    setTimeout(polling, 1000*60*30);
}

function silent_refresh(token_bin) {
    console.log(token_bin);
    const refresh_token = token_bin.refresh_token;

    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token_bin.authorization}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });
}

function getPlaylist(access_token) {
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    });
}

function displayPlaylist(data) {
    if(data.hasOwnProperty('item') && data.item !== null && data.item.hasOwnProperty('name')) {
        document.querySelector("#trackname").innerHTML = data.item.name;
        document.querySelector("#albumname").innerHTML = data.item.artists[0].name;

        const albumimg = document.querySelector("#albumimg");
        while(albumimg.firstChild) {
            albumimg.removeChild(albumimg.firstChild);
        }

        const imgs = data.item.album.images;
        const img = imgs[2];
        const img_tag = document.createElement('img');
        img_tag.setAttribute('width', img.width);
        img_tag.setAttribute('height', img.height);
        img_tag.setAttribute('src', img.url);
        albumimg.appendChild(img_tag);
    }
}