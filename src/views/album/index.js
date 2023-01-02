import $ from 'jquery';
import dayjs from 'dayjs';
import album from '../../components/album.art';

export const albumInit = () => {
    $('.loading-container').show();

    // 获取所有专辑
    $.ajax({
        url: 'https://netease-cloud-music-api-tan-xi.vercel.app/artist/album?id=980025',
        success: (res) => {
            const albums = res.hotAlbums;
            albums.forEach((item) => {
                item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD');
            });

            $('.loading-container').hide();
            $('#album-list').append(album({ albums }));
        },
    });
};
