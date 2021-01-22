import Hero from './hero.class.js';
import Stranger from './strangers.class.js';

window.addEventListener('DOMContentLoaded', (e) => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const x = innerWidth / 2;
    const y = innerHeight / 2;
    const colors = ['white', '#ff6698', '#ffb366', '#ffff66', '#98ff66', '#6698ff', '#980DFF', '#9370DB'];

    canvas.width = innerWidth;
    canvas.height = innerHeight;


    let hero = new Hero(x, y, 10, 'white', {});

    let animationId;
    let strangers = [];


    const spawnStrangers = () => {
        setInterval((e) => {
            // create strangers
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = (Math.random() * 23);
            let random_color = Math.floor(Math.random() * colors.length);

            let stranger = new Stranger(
                x, y, size < 5 ? 5 : size,
                colors[random_color], {
                x: (Math.random() - 0.5) * (Math.random() * 8),
                y: (Math.random() - 0.5) * (Math.random() * 8)
            });
            strangers.push(stranger);
        }, 1000);
    }

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        // clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw hero
        hero.draw();

        strangers.forEach((s, i) => {
            s.update();

            // remove off screen strangers
            if (
                s.x + s.radius < 0 ||
                s.x - s.radius > canvas.width ||
                s.y + s.radius < 0 ||
                s.y - s.radius > canvas.height
            ) { strangers.splice(i, 1); }
        });
    }

    animate();
    spawnStrangers();
});