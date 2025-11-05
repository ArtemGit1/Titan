document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.burger-btn');
    const modalMenu = document.getElementById('modalMenu');
    const closeModal = document.getElementById('closeModal');
    burgerBtn.addEventListener('click', () => {
        modalMenu.classList.add('active');
    });
    closeModal.addEventListener('click', () => {
        modalMenu.classList.remove('active');
    });
});
