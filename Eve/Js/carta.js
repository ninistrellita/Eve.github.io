document.addEventListener('DOMContentLoaded', () => {

    const CLAVE_CORRECTA = "0921";

    const pantallaCandado = document.getElementById('pantalla-candado');
    const seccionCarta = document.getElementById('seccion-carta');
    const claveInput = document.getElementById('clave-input');
    const btnDesbloquear = document.getElementById('btn-desbloquear');
    const mensajeError = document.getElementById('mensaje-error');
    const sobre = document.getElementById('sobre');


    function verificarClave() {
        if (claveInput.value.trim() === CLAVE_CORRECTA) {
            pantallaCandado.style.display = 'none';
            seccionCarta.classList.remove('oculta');
        } else {
            mensajeError.textContent = "Clave incorrecta. Inténtalo de nuevo 💗";
            claveInput.value = '';
            claveInput.focus();
        }
    }

    btnDesbloquear.addEventListener('click', verificarClave);

    claveInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verificarClave();
        }
    });

    sobre.addEventListener('click', () => {
        sobre.classList.toggle('abierto');
    });
});