import $ from 'jquery';
import card from '../components/card.art';

const movies = [
    {
        title: '永不失联的爱',
        desc: '如果雨之后',
        comment: '从一个角色来写歌',
    },
];

export const homeInit = () => {
    $('#music-list').append(card({ movies }));
    $('.more-icon').click(() => {
        window.location.hash = '#/about';
    });

    let player;
    const onPlayerReady = (event) => {
        event.target.playVideo();
    };

    let done = false;
    const onPlayerStateChange = (event) => {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    };
    const stopVideo = () => {
        player.stopVideo();
    };

    const onYouTubeIframeAPIReady = () => {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: 'eZh1mC1vPgw',
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };
    console.log($('#list'));

    // onYouTubeIframeAPIReady();
};
