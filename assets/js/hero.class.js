const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export default class Hero {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius,
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
    }
}