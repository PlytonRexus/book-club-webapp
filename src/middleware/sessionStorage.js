exports.swrite = (key, value) => {
    sessionStorage.setItem(key, value);
}

exports.sread = (key) => {
    return sessionStorage.getItem(key);
}

exports.sremove = (key) => {
    sessionStorage.removeItem(key);
}