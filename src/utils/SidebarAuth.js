const showOverlay = (text) => {
    var overlay = document.querySelector('.sidebar-auth-overlay');
    var overlayText = document.querySelector('.sidebar-auth-overlay-text');
    overlay.style.display = 'block';
    overlayText.innerHTML = text;
}

const hideOverlay = () => {
    var overlay = document.querySelector('.sidebar-auth-overlay');
    var overlayText = document.querySelector('.sidebar-auth-overlay-text');
    overlay.style.display = 'none';
    overlayText.innerHTML = '';
}

export { showOverlay, hideOverlay };