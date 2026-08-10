function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-flotante');
    corazon.innerText = '💗';
    

    corazon.style.left = Math.random() * 100 + 'vw';

    corazon.style.fontSize = (Math.random() * 15 + 15) + 'px';

    corazon.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    document.body.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 5000);
}

setInterval(crearCorazon, 600);