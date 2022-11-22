import './styles/normalize.css';
import './styles/index.css';

import $ from 'jquery';

import Home from './views/home/index.art';
import About from './views/about/index.art';
import { homeInit } from './views/home';

$(document).ready(function () {
    const routerView = $('#routerView');

    const onHashChange = () => {
        // 前端hash路由change
        switch (window.location.hash) {
            case '#/home':
                routerView.html(Home({}));
                homeInit();
                return;
            case '#/about':
                routerView.html(About({}));
                return;
            default:
                return;
        }
    };

    window.location.hash = '#/home';

    window.addEventListener('hashchange', onHashChange);
});
