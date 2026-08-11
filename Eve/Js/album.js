document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modal-foto');
    const modalImg = document.getElementById('img-modal');
    const captionText = document.getElementById('caption-modal');
    const btnCerrar = document.querySelector('.cerrar-modal');
    const tarjetas = document.querySelectorAll('.tarjeta-foto');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            const img = tarjeta.querySelector('img');
            const texto = tarjeta.querySelector('.pie-foto').textContent;
            
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.textContent = texto;
        });
    });

    btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});