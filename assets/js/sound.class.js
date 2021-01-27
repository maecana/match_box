export default class Sound {
    constructor() {
        this.hero_off_screen_sound = new Audio;
        this.hero_off_screen_sound.src = '../assets/sound/bone_breaking.mp3';
        this.hero_off_screen_sound.volume = 1.0;

        this.button_click = new Audio;
        this.button_click.src = '../assets/sound/click.mp3';
        this.button_click.volume = 1.0;

        this.bg = new Audio;
        this.bg.src = '../assets/sound/bg.mp3';
        this.bg.volume = 0.5;
        this.bg.loop = true;

        this.game_over = new Audio;
        this.game_over.src = '../assets/sound/game_over.mp3';
        this.game_over.volume = 1.0;
    }

    playHeroOffScreen() {
        this.hero_off_screen_sound.play();
    }

    playButtonClick() {
        this.button_click.play();
    }

    playBg() {
        this.bg.play();
    }

    playGameOver() {
        this.game_over.play();
    }

    stopBg() {
        this.bg.pause();
        this.bg.currentTime = 0;
    }
};