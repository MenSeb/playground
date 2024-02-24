import context from '../context.json';

export class Menu {
    constructor() {
        this.expanded = false;
        this.classActive = 'menu-active';

        this.menu = document.getElementById(context.ids.menu.panel);
        this.button = document.getElementById(context.ids.menu.button);

        this.button.addEventListener('click', this.toggle);

        const scrollbarWidth = window.innerWidth - document.body.clientWidth;

        this.button.style.setProperty(
            '--scrollbar-width',
            `${scrollbarWidth}px`,
        );
    }

    toggle = () => {
        this.expanded = !this.expanded;

        this.menu.classList.toggle(this.classActive);

        this.button.classList.toggle(this.classActive);
        this.button.setAttribute('aria-expanded', this.expanded);

        document.documentElement.classList.toggle(this.classActive);
    };
}
