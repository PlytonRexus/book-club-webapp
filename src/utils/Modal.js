const launchModal = () => {
    const modal = document.querySelector('.modal');
    // const modalContent = document.querySelector('.modal-content');

    modal.style.display = 'block';
    // <div><Content /></div>
    // Find a way to pass and use components.
}

const closeModal = () => {
    const modal = document.querySelector('.modal');
    // const modalContent = document.querySelector('.modal-content');

    modal.style.display = 'none';
}

export { launchModal, closeModal };