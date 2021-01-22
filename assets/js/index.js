import Hero from './hero.class.js';
import Stranger from './strangers.class.js';
import Particle from './particle.class.js';

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
    let particles = [];


    // spawn strangers every 200ms
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
                    x: (Math.random() - 0.5) * (Math.random() * 10),
                    y: (Math.random() - 0.5) * (Math.random() * 10)
                });
            strangers.push(stranger);
        }, 150);
    }

    // create explosion
    const explosion = (obj) => {
        for (let i = 0; i < obj.radius; i++) {
            let size = Math.random() * 3;
            let particle = new Particle(
                obj.x, obj.y,
                size, obj.color, {
                    x: (Math.random() - 0.5) * (Math.random() * 5),
                    y: (Math.random() - 0.5) * (Math.random() * 5)
                });
            particles.push(particle);
        }
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
            ) {
                setTimeout((e) => {
                    strangers.splice(i, 1);
                }, 0);
            }

            // stranger and hero collide
            let dist = Math.hypot(
                s.x - hero.x,
                s.y - hero.y
            );

            if ((dist - s.radius - hero.radius) < 1) {
                // destroy stranger
                setTimeout((e) => {
                    strangers.splice(i, 1);
                }, 0);

                // explosion
                explosion(s);
            }
        });

        // explosion
        particles.forEach((p, i) => {
            p.update();

            // remove invisible particle
            if (p.alpha <= 0.1) {
                setTimeout((e) => {
                    particles.splice(i, 1);
                }, 0);
            }
        })
    }

    animate();
    spawnStrangers();
});