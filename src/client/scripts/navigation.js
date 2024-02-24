export class Navigation {
    constructor() {
        const links = document.querySelectorAll(
            `nav a[href="${window.location.pathname}"]`,
        );

        for (const link of links) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        }
    }
}
