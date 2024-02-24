import { Carousel } from './carousel.js';
import { Navigation } from './navigation.js';
import { Menu } from './menu.js';

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        new Menu();
        new Navigation();
        new Carousel({ id: 'carousel-banner' });
    });
})();
