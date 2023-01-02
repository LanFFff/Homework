import $ from 'jquery';
import card from '../../components/card.art';

import { playSongClick } from '../../utils';
import { likeSongClick } from '../../utils';

export const homeInit = () => {
    let songsTemp = [];

    $('.more-icon').click(() => {
        window.location.hash = '#/about';
    });

    let player;
    const onPlayerReady = (event) => {
        event.target.mute().playVideo();
    };

    let done = false;
    const onPlayerStateChange = (event) => {
        if (event.data == YT.PlayerState.PLAYING && done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    };
    const stopVideo = () => {
        player.stopVideo();
    };

    const onYouTubeIframeAPIReady = () => {
        player = new YT.Player('video-player', {
            height: '360',
            width: '100%',
            videoId: 'eZh1mC1vPgw',
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    };

    window.YT.ready(() => {
        onYouTubeIframeAPIReady();
    });

    $('.loading-container').show();
    // 获取top50首歌曲
    $.ajax({
        url: 'https://netease-cloud-music-api-tan-xi.vercel.app/artist/top/song?id=980025',
        success: (res) => {
            const songs = res.songs.map((item) => {
                return {
                    name: item.name,
                    alName: item.al.name,
                    id: item.id,
                };
            });

            const collectLocal = localStorage.getItem('collect');
            const collect = collectLocal ? JSON.parse(collectLocal) : [];
            songsTemp = songs.map((item) => {
                if (collect.find((i) => i.id == item.id) != undefined) {
                    return {
                        ...item,
                        like: true,
                    };
                } else return item;
            });

            $('.loading-container').hide();
            $('#music-list').append(card({ songs: songsTemp }));

            playSongClick();

            likeSongClick(songsTemp);
        },
    });

    $('#search-submit').click(() => {
        $('#music-list').empty();
        $('.loading-container').show();

        const key = $('#search-key').val();

        $.ajax({
            url: 'https://netease-cloud-music-api-tan-xi.vercel.app/search?keywords=周兴哲 ' + key,
            success: (res) => {
                // 筛选出周兴哲演唱歌曲
                const songs = res.result.songs
                    .filter((item) => item.artists[0].id == 980025)
                    .map((item) => {
                        return {
                            name: item.name,
                            alName: item.album.name,
                            id: item.id,
                        };
                    });
                $('.loading-container').hide();
                $('#music-list').append(card({ songs }));
            },
        });
    });
};
