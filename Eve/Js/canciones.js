document.addEventListener('DOMContentLoaded', () => {

    const canciones = [
        {
            id: 0,
            titulo: "Una Y Otra Vez",
            artista: "Manuel Medrano",
            album: "Una Y Otra Vez",
            duracion: "3:13",
            portada: "../img/img canciones/img1.jpe",
            audio: "../musica/una y otra vez.mp3"
        },
        {
            id: 1,
            titulo: "Lover",
            artista: "Metro Boomin, James Blake",
            album: "Hummingbird",
            duracion: "5:19",
            portada: "../img/img canciones/img2.jpe",
            audio: "../musica/hummingbird.mp3"
        },
        {
            id: 2,
            titulo: "Yellow",
            artista: "Coldplay",
            album: "Parachutes",
            duracion: "4:26",
            portada: "../img/img canciones/img3.jpe",
            audio: "../musica/yellow.mp3"
        }
    ];


    const contenedorCanciones = document.getElementById('contenedor-canciones');
    const totalCancionesText = document.getElementById('total-canciones');
    const audioPlayer = document.getElementById('audio-player');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const btnPlayPrincipal = document.getElementById('btn-play-principal');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const playerImg = document.getElementById('player-img');
    const playerTitulo = document.getElementById('player-titulo');
    const playerArtista = document.getElementById('player-artista');
    const progresoLinea = document.getElementById('progreso-linea');
    const barraProgreso = document.getElementById('barra-progreso');
    const tiempoActualElem = document.getElementById('tiempo-actual');
    const tiempoTotalElem = document.getElementById('tiempo-total');
    const controlVolumen = document.getElementById('volumen');

    let cancionActualIndex = 0;
    let estaReproduciendo = false;


    if (totalCancionesText) {
        totalCancionesText.textContent = `${canciones.length} canciones`;
    }


    function renderizarCanciones() {
        contenedorCanciones.innerHTML = '';

        canciones.forEach((track, index) => {
            const fila = document.createElement('div');
            fila.classList.add('fila-cancion');
            if (index === cancionActualIndex && estaReproduciendo) {
                fila.classList.add('activa');
            }

            fila.innerHTML = `
                <span class="col-num">${index + 1}</span>
                <div class="col-titulo-box">
                    <div class="img-cancion-wrapper">
                        <img src="${track.portada}" alt="${track.titulo}">
                        <div class="overlay-play">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <div class="info-texto">
                        <span class="titulo-cancion">${track.titulo}</span>
                        <span class="artista-cancion">${track.artista}</span>
                    </div>
                </div>
                <span class="col-album">${track.album}</span>
                <span class="col-duracion">${track.duracion}</span>
            `;

            fila.addEventListener('click', () => {
                cargarYReproducirCancion(index);
            });

            contenedorCanciones.appendChild(fila);
        });
    }


    function cargarCancion(index) {
        cancionActualIndex = index;
        const track = canciones[cancionActualIndex];

        audioPlayer.src = track.audio;
        playerImg.src = track.portada;
        playerTitulo.textContent = track.titulo;
        playerArtista.textContent = track.artista;
        tiempoTotalElem.textContent = track.duracion;

        renderizarCanciones();
    }


    function togglePlay() {
        if (!audioPlayer.src) {
            cargarCancion(0);
        }

        if (estaReproduciendo) {
            audioPlayer.pause();
            estaReproduciendo = false;
            btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i>';
            btnPlayPrincipal.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            audioPlayer.play();
            estaReproduciendo = true;
            btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
            btnPlayPrincipal.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        renderizarCanciones();
    }

    function cargarYReproducirCancion(index) {
        cargarCancion(index);
        estaReproduciendo = false;
        togglePlay();
    }


    function siguienteCancion() {
        cancionActualIndex = (cancionActualIndex + 1) % canciones.length;
        cargarYReproducirCancion(cancionActualIndex);
    }

    function anteriorCancion() {
        cancionActualIndex = (cancionActualIndex - 1 + canciones.length) % canciones.length;
        cargarYReproducirCancion(cancionActualIndex);
    }


    audioPlayer.addEventListener('timeupdate', (e) => {
        const { currentTime, duration } = e.target;
        if (duration) {
            const porcentaje = (currentTime / duration) * 100;
            progresoLinea.style.width = `${porcentaje}%`;

            // Formatear minutos y segundos
            const min = Math.floor(currentTime / 60);
            const seg = Math.floor(currentTime % 60);
            tiempoActualElem.textContent = `${min}:${seg < 10 ? '0' : ''}${seg}`;
        }
    });


    barraProgreso.addEventListener('click', (e) => {
        const ancho = barraProgreso.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        if (duration) {
            audioPlayer.currentTime = (clickX / ancho) * duration;
        }
    });


    controlVolumen.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });

  
    btnPlayPause.addEventListener('click', togglePlay);
    btnPlayPrincipal.addEventListener('click', togglePlay);
    btnNext.addEventListener('click', siguienteCancion);
    btnPrev.addEventListener('click', anteriorCancion);


    audioPlayer.addEventListener('ended', siguienteCancion);

    renderizarCanciones();
    cargarCancion(0);
});