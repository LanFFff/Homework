import $ from 'jquery';
import card from '../../components/card.art';
import loading from '../../components/loading.art';

export const homeInit = () => {
    const playSong = () => {
        $('.play-button').click((e) => {
            const playButton = $(e.target);
            const id = playButton.attr('id');
            const player = $('#song-player')[0];
            if (playButton.attr('value') == 'play') {
                // 暂停
                player.pause();
                $('.stop-' + id).show();
                $('.play-' + id).hide();
            } else {
                // 播放
                $.ajax({
                    url: 'https://netease-cloud-music-api-tan-xi.vercel.app/song/url?id=' + id,
                    success: (res) => {
                        const song_url = res.data[0].url;
                        $('#player-source').attr('src', song_url);
                        player.load();
                        player.play();
                        $('.stop-' + id).hide();
                        $('.play-' + id).show();
                    },
                });
            }
        });
    };

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
            $('#music-list').append(card({ songs }));

            playSong();
        },
    });

    $('#search-submit').click(() => {
        const key = $('#search-key').val();
        $('#music-list').empty();
        $('#music-list').append(loading);
        $.ajax({
            url: 'https://netease-cloud-music-api-tan-xi.vercel.app/search?keywords=周兴哲 ' + key,
            success: (res) => {
                console.log(res);
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
                $('#music-list').empty();
                $('#music-list').append(card({ songs }));
            },
        });
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
        player = new YT.Player('video-player', {
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
