exports.lwrite = (key, value) => {
    localStorage.setItem(key, value);
}

exports.lread = (key) => {
    return localStorage.getItem(key);
}

exports.lremove = (key) => {
    localStorage.removeItem(key);
}