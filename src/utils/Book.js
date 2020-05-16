const fetchBook = async (url, id) => {
    var response;
    try {
        response = await fetch(
            `${url}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 500) {
            showBookOverlay('Invalid request. This tab will close in 3 seconds.');
            setTimeout(window.close, 3000);
        }

        if (response.ok) {
            var fetchedBook = await response.json();
            return fetchedBook;
        }
        else {
            if (response.statusCode === 400) {
                showBookOverlay('No such book found.');
            }
        }
    }
    catch(error) {
        console.log(error);
        showBookOverlay('Some error occured, you will be redirected back to the catalogue.');
    }
}

const showBookOverlay = (text) => {
    const overlay = document.querySelector('.book-overlay');
    const overlayText = document.querySelector('.book-overlay-text');
    overlay.style.display = 'block';
    overlayText.innerHTML = text;
}

const hideBookOverlay = (text) => {
    const overlay = document.querySelector('.book-overlay');
    const overlayText = document.querySelector('.book-overlay-text');
    overlay.style.display = 'none';
    overlayText.innerHTML = '';
}

export { fetchBook, showBookOverlay, hideBookOverlay };