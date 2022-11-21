import './styles/normalize.css';
import './styles/index.css';

import card from '../views/card.art';

const movies = [
    {
        title: '永不失联的爱',
        desc: '如果雨之后',
        comment: '从一个角色来写歌',
    },
];

document.getElementById('list').innerHTML = card({ movies });

console.log('youtube');

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'eZh1mC1vPgw',
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

onYouTubeIframeAPIReady();
