import './styles/normalize.css';
import './styles/index.css';

import $ from 'jquery';

import Home from './views/home/index.art';
import { homeInit } from './views/home';

$(document).ready(function () {
    const routerView = $('#routerView');

    const onHashChange = () => {
        // 前端hash路由change
        switch (location.hash) {
            case '#/home':
                routerView.html(Home({}));
                homeInit();
                return;
            case '#/about':
                routerView.html(Home({}));
                return;
            default:
                return;
        }
    };

    onHashChange();

    window.addEventListener('hashchange', onHashChange);
});
