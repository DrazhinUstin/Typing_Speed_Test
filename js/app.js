import * as storage from './modules/storage.js';
import setupTest from "./modules/setupTest.js";

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('test-language');
    const modalWrapper = document.querySelector('.modal-wrapper');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const categoriesWrapper = modalWrapper.querySelector('.categories-wrapper');
    const categoriesDOM = categoriesWrapper.lastElementChild;
    const settings = storage.getStorageItem('settings');
    if (settings.language) select.value = settings.language;
    setupTest();

    select.addEventListener('change', () => {
        storage.setStorageItem('settings', {language: select.value});
    });

    closeModalBtn.addEventListener('click', () => {
        modalWrapper.classList.remove('show');
    });

    categoriesWrapper.firstElementChild.addEventListener('click', () => {
        categoriesWrapper.classList.toggle('active');
        if (categoriesWrapper.classList.contains('active')) {
            categoriesDOM.style.height = `${defineElemHeight(categoriesDOM)}px`;
        } else {
            categoriesDOM.style.height = '';
        }
    });

    function defineElemHeight (elem) {
        let totalHeight = 0;
        [...elem.children].forEach(child => totalHeight += child.offsetHeight);
        return totalHeight;
    }
});

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
        preloader.addEventListener('transitionend', () => preloader.remove());
    }, 500);
});