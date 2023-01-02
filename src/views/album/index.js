import $ from 'jquery';
import dayjs from 'dayjs';
import album from '../../components/album.art';

export const albumInit = () => {
    // 获取前50首歌曲
    $.ajax({
        url: 'https://netease-cloud-music-api-tan-xi.vercel.app/artist/album?id=980025&limit=45',
        success: (res) => {
            const albums = res.hotAlbums;
            albums.forEach((item) => {
                console.log(item.publishTime);

                item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD');
            });
            $('#album-list').append(album({ albums }));
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
