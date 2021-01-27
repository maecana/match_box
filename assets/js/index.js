import Hero from './hero.class.js';
import Stranger from './strangers.class.js';
import Particle from './particle.class.js';
import Sound from './sound.class.js';

window.addEventListener('DOMContentLoaded', (e) => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const restartBtn = document.querySelector('#btnRestart');
    const canvasScore = document.querySelector('#canvasScore');
    const modalScore = document.querySelector("#modalScore");

    const x = innerWidth / 2;
    const y = innerHeight / 2;
    const colors = ['white', '#ff6698', '#ffb366', '#ffff66', '#98ff66', '#6698ff', '#980DFF', '#9370DB'];
    const hero_speed = 5;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let hero;
    let animationId;
    let strangers;
    let particles;
    let LEFT;
    let RIGHT;
    let UP;
    let DOWN;
    let score;
    let sounds;
    let hero_off_screen_sound;
    let hero_stranger_sound;

    const init = () => {
        hero = new Hero(x, y, 10, 'white', {});
        strangers = [];
        particles = [];
        LEFT = false;
        RIGHT = false;
        UP = false; 
        DOWN = false;
        score = 0;
        sounds = new Sound();
        hero_off_screen_sound = new Sound();
        hero_stranger_sound = new Sound();

        canvasScore.innerHTML = 0;
    }
    
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
        for (let i = 0; i < obj.radius * 2.5; i++) {
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
        
        move();

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
                setTimeout((e) => { strangers.splice(i, 1);
                }, 0);
            }

            // stranger and hero collide
            let dist = Math.hypot(s.x - hero.x, s.y - hero.y);

            if ((dist - s.radius - hero.radius) < 1) {
                // destroy stranger
                setTimeout((e) => { strangers.splice(i, 1); }, 0);

                // explosion
                explosion(s);

                // hero-stranger collision sound
                let hero_stranger_sound = new Audio;
                hero_stranger_sound.src = '../assets/sound/smash.mp3';
                hero_stranger_sound.volume = 1.0;
                hero_stranger_sound.play();
                hero_stranger_sound = null;
                
                // set score
                score += parseInt(s.radius+50);
                canvasScore.innerHTML = score;
            }
        });

        // explosion
        particles.forEach((p, i) => {
            p.update();

            // remove invisible particle
            if (p.alpha <= 0.1) {
                setTimeout((e) => { particles.splice(i, 1); }, 0);
            }
        });
    }

    // KEYDOWN FOR LEFT , RIGHT, UP, DOWN
    document.onkeydown = (e) => {
        if (e.keyCode == 37) LEFT = true;
        if (e.keyCode == 38) UP = true;
        if (e.keyCode == 39) RIGHT = true;
        if (e.keyCode == 40) DOWN = true;
    }

    document.onkeyup = (e) => {
        if (e.keyCode == 37) LEFT = false;
        if (e.keyCode == 38) UP = false;
        if (e.keyCode == 39) RIGHT = false;
        if (e.keyCode == 40) DOWN = false;
    }

    // MOVE HERO
    const move = () => {
        if (LEFT) hero.x -= hero_speed;
        if (RIGHT) hero.x += hero_speed;
        if (UP) hero.y -= hero_speed;
        if (DOWN) hero.y += hero_speed;

        // HERO off bound
        if (hero.x - hero.radius < 0 ||
            hero.x + hero.radius > canvas.width ||
            hero.y - hero.radius < 0 ||
            hero.y + hero.radius > canvas.height ) {
            hero.color = 'red';
            explosion(hero);
            hero.radius = 0;
            
            // play dead sound
            if(hero_off_screen_sound) {
                hero_off_screen_sound.playHeroOffScreen();
                sounds.stopBg();
            }
            
            // stop animation
            setTimeout((e) => {
                modalScore.innerHTML = score;
                if(score > 0) {
                    restartBtn.innerHTML = 'Restart Game';
                }
                $("#restartModal").modal('show');

                cancelAnimationFrame(animationId);
            }, 500);
        }
    }


    // restart
    restartBtn.addEventListener('click', (e) => {
        init();
        animate();
        spawnStrangers();
        move();
        sounds.playButtonClick();
        sounds.playBg();

        $("#restartModal").modal('hide');
    });
    
    // show modal
    $("#restartModal").modal('show');
});