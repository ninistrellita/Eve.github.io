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
            titulo: "Especial",
            artista: "Eladio Carrion",
            album: "Sauce Boyz Care Package",
            duracion: "2:45",
            portada: "../img/img canciones/img3.jpe",
            audio: "../musica/Especial.mp3"
        },
         {
            id: 2,
            titulo: "Moonstruck",
            artista: "Enhypen",
            album: "ROMANCE:UNTOLD",
            duracion: "2:38",
            portada: "../img/img canciones/img8.jpe",
            audio: "../musica/moonstruck.mp3"
        },
        {
            id: 3,
            titulo: "Hummingbird",
            artista: "Metro Boomin, James Blake",
            album: "METRO BOOMIN PRESENTS SPIDER-MAN: ACROSS THE SPIDER-VERSE (SOUNTRACK FROM & INSPIRED BY THE MOTION PICTURE)",
            duracion: "5:19",
            portada: "../img/img canciones/img4.jpe",
            audio: "../musica/hummingbird.mp3"
        },
        {
            id: 4,
            titulo: "444",
            artista: "Yan Block",
            album: "Panda Block",
            duracion: "2:55",
            portada: "../img/img canciones/img6.jpe",
            audio: "../musica/444.mp3"
        },
        {
            id: 5,
            titulo: "Mirros",
            artista: "Justin Timberlake",
            album: "The 20/20 Experience",
            duracion: "4:44",
            portada: "../img/img canciones/img7.jpe",
            audio: "../musica/mirros.mp3"
        },
        {
            id: 6,
            titulo: "Best Part",
            artista: "Daniel Caesar, H.E.R.",
            album: "Freudian",
            duracion: "3:29",
            portada: "../img/img canciones/img8.jpe",
            audio: "../musica/best part.mp3"
        },
        {
            id: 7,
            titulo: "Double Take",
            artista: "Dhruv",
            album: "rapunzel",
            duracion: "2:51",
            portada: "../img/img canciones/img9.jpe",
            audio: "../musica/double take.mp3"
        },
        {
            id: 8,
            titulo: "My One And Only Love",
            artista: "Mon Laferte",
            album: "FEMME FATALE",
            duracion: "3:01",
            portada: "../img/img canciones/img10.jpe",
            audio: "../musica/my one and only love.mp3"
        },
        {
            id: 9,
            titulo: "I Like Me Better",
            artista: "Lauv",
            album: "I Like Me Better",
            duracion: "3:17",
            portada: "../img/img canciones/img11.jpe",
            audio: "../musica/i like me better.mp3"
        },
        {
            id: 10,
            titulo: "Aquel Nap Zzzz",
            artista: "Rauw Alejandro",
            album: "VICE VERSA",
            duracion: "4:55",
            portada: "../img/img canciones/img12.jpe",
            audio: "../musica/aquel nap zzzz.mp3"
        },
        {
            id: 11,
            titulo:"Afuera Del Planeta",
            artista:"Manuel Medrano",
            album:"Manuel Medrano",
            duracion:"3:49",
            portada:"../img/img canciones/img13.jpe",
            audio:"../musica/afuera del planeta.mp3"
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