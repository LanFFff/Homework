import './styles/normalize.css';
import './styles/index.css';

import $ from 'jquery';

import Home from './views/home/index.art';
import About from './views/about/index.art';
import Album from './views/album/index.art';
import { homeInit } from './views/home';
import { albumInit } from './views/album';

$(document).ready(function () {
    const routerView = $('#routerView');

    const onHashChange = () => {
        console.log(window.location.hash);
        // 前端hash路由change
        switch (window.location.hash) {
            case '#/home':
                routerView.html(Home({}));
                homeInit();
                return;
            case '#/about':
                routerView.html(About({}));
                return;
            case '#/album':
                routerView.html(Album({}));
                albumInit();
                return;
            default:
                return;
        }
    };

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
});
