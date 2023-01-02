import $ from 'jquery';
import card from '../../components/card.art';

import { playSongClick } from '../../utils';
import { likeSongClick } from '../../utils';

export const collectInit = () => {
    let songsTemp = [];

    // 获取本地收藏
    const collectLocal = localStorage.getItem('collect');
    const collect = collectLocal ? JSON.parse(collectLocal) : [];
    songsTemp = collect;

    $('#collect-list').append(card({ songs: songsTemp }));
    playSongClick();
    likeSongClick(songsTemp);
};
