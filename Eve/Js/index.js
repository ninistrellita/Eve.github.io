document.addEventListener('DOMContentLoaded', () => {

    const textoSubtitulo = "Un pedacito de lo mucho que te amo...";
    const elementoSubtitulo = document.getElementById('tipeo-texto');
    let index = 0;

    function escribirTexto() {
        if (index < textoSubtitulo.length) {
            elementoSubtitulo.textContent += textoSubtitulo.charAt(index);
            index++;
            setTimeout(escribirTexto, 70);
        }
    }
    escribirTexto();


    const fechaInicio = new Date(2025, 6, 29);

    function actualizarContador() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / 1000 / 60) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        const contadorElemento = document.getElementById('contador');
        if (contadorElemento) {
            contadorElemento.textContent = `${dias} días, ${horas}h ${minutos}m ${segundos}s`;
        }
    }

    actualizarContador();
    setInterval(actualizarContador, 1000); 


    const musica = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');

    if (btnMusica && musica) {
        btnMusica.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                btnMusica.textContent = '🎶';
            } else {
                musica.pause();
                btnMusica.textContent = '🎵';
            }
        });
    }
});