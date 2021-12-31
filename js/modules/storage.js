const setStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getStorageItem = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {};
};

export {setStorageItem, getStorageItem};