import $ from 'jquery';
import card from '../components/card.art';

export const homeInit = () => {
    // 获取前30首歌曲
    $.ajax({
        url: 'http://music.cyrilstudio.top/search?keywords=周兴哲',
        success: (res) => {
            const songs = res.result.songs;
            $('#music-list').append(card({ songs }));
        },
    });
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

    // onYouTubeIframeAPIReady();
};
