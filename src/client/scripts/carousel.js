export const defaultSettings = {
    autoplay: true,
    timer: 5000,
};

export class Carousel {
    constructor(customSettings = {}) {
        this.settings = { ...defaultSettings, ...customSettings };

        this.carousel = document.getElementById(this.settings.id);
        this.container = this.carousel.querySelector('.carousel-slides');
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.pickers = this.carousel.querySelector('.carousel-pickers');
        this.controls = ['next', 'prev', 'play', 'stop'].reduce(
            (obj, control) => ({
                ...obj,
                [control]: this.carousel.querySelector(
                    `[data-control="${control}"]`,
                ),
            }),
            {},
        );

        this.index = 0;
        this.idInterval = undefined;
        this.length = this.slides.length;
        this.percent = 100 / this.length;
        this.playing = this.settings.autoplay;

        this.register();
        this.updateControl();

        if (this.playing) this.play();
    }

    register = () => {
        this.carousel.addEventListener('mouseenter', this.handleFocus);
        this.carousel.addEventListener('mouseleave', this.handleBlur);
        this.carousel.addEventListener('focusin', this.handleFocus);
        this.carousel.addEventListener('focusout', this.handleBlur);

        this.pickers.addEventListener('click', this.pick);

        this.controls.play.addEventListener('click', this.play);
        this.controls.stop.addEventListener('click', this.stop);
        this.controls.next.addEventListener('click', this.next);
        this.controls.prev.addEventListener('click', this.prev);
    };

    handleFocus = (event) => {
        if (event.target !== this.carousel) return;

        this.focus = true;
        this.stop(event);
    };

    handleBlur = (event) => {
        if (event.target !== this.carousel) return;

        this.focus = false;

        if (this.playing) {
            this.play(event);
        }
    };

    pick = (event) => {
        const { target } = event;

        if (target.type !== 'button') return;

        const { index } = target.dataset;

        if (this.index == index) return;

        this.updateSlide(+index);
        this.updatePicker();
    };

    next = () => {
        this.stop();
        this.updateSlide(this.index + 1);
        this.updatePicker();
    };

    prev = () => {
        this.stop();
        this.updateSlide(this.index - 1);
        this.updatePicker();
    };

    slide = () => {
        this.updateSlide(this.index + 1);
        this.updatePicker();
    };

    play = (event) => {
        if (event && event.type === 'click' && !this.playing) {
            this.playing = true;
            this.updateControl();
        }

        if (this.idInterval === undefined && !this.focus) {
            this.idInterval = window.setInterval(
                this.slide,
                this.settings.timer,
            );
            this.updateLive();
        }
    };

    stop = (event) => {
        if (event && event.type === 'click' && this.playing) {
            this.playing = false;
            this.updateControl();
        }

        if (this.idInterval !== undefined) {
            window.clearInterval(this.idInterval);
            this.idInterval = undefined;
            this.updateLive();
        }
    };

    translate = () => {
        this.container.style.setProperty(
            'transform',
            `translate(-${this.index * this.percent}%)`,
        );
    };

    updateControl = () => {
        this.controls.play.setAttribute('aria-pressed', this.playing);
        this.controls.stop.setAttribute('aria-pressed', !this.playing);
    };

    updateLive = () => {
        this.container.setAttribute(
            'aria-live',
            this.idInterval === undefined ? 'off' : 'polite',
        );
    };

    updatePicker = () => {
        this.pickers
            .querySelector('[aria-disabled="true"]')
            .setAttribute('aria-disabled', false);

        this.pickers
            .querySelector(`[data-index="${this.index}"]`)
            .setAttribute('aria-disabled', true);
    };

    updateSlide = (index) => {
        this.index = (index + this.length) % this.length;
        this.translate();
    };
}
