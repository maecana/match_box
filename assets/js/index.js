import Hero from './hero.class.js';

window.addEventListener('DOMContentLoaded', (e) => {
    console.log('hello world!');

    const canvas = document.querySelector('canvas');
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const ctx = canvas.getContext('2d');
    

    let x = innerWidth / 2;
    let y = innerHeight / 2;

    let hero = new Hero(ctx, x, y, 10, 'white', {});
    hero.draw();
});