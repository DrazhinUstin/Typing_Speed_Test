import setupTest from "./modules/setupTest.js";

document.addEventListener('DOMContentLoaded', () => {
    setupTest();
});

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        preloader.addEventListener('transitionend', () => preloader.remove());
    }, 500);
});