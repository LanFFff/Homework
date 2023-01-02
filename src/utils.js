import $ from 'jquery';
import loading from './components/loading.art';

// 注册播放音乐点击事件
export const playSongClick = () => {
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
            $('.stop-' + id).hide();
            $('#play-loading').show();
            $.ajax({
                url: 'https://netease-cloud-music-api-tan-xi.vercel.app/song/url?id=' + id,
                success: (res) => {
                    const song_url = res.data[0].url;
                    $('#player-source').attr('src', song_url);
                    player.load();
                    player.play();
                    $('#play-loading').hide();
                    $('.play-' + id).show();

                    player.addEventListener('pause', () => {
                        // 监听歌曲结束
                        $('.stop-' + id).show();
                        $('.play-' + id).hide();
                    });
                },
            });
        }
    });
};

// 注册收藏音乐点击事件
export const likeSongClick = (songsTemp) => {
    $('.like-button').click((e) => {
        const likeButton = $(e.target);
        const id = likeButton.attr('id');

        const collectLocal = localStorage.getItem('collect');
        const collect = collectLocal ? JSON.parse(collectLocal) : [];

        if (likeButton.attr('value') == 'like') {
            // 取消收藏
            $('.dis-like-' + id).show();
            $('.like-' + id).hide();

            songsTemp.map((item) => {
                if (item.id == id) {
                    const index = collect.findIndex((item) => item.id == id);
                    collect.splice(index, 1);
                }
            });
        } else {
            // 收藏
            $('.dis-like-' + id).hide();
            $('.like-' + id).show();

            songsTemp.map((item) => {
                if (item.id == id) {
                    collect.push({ ...item, like: true });
                }
            });
        }

        localStorage.setItem('collect', JSON.stringify(collect));
    });
};
