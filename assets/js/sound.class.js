export default class Sound {
    constructor() {
        this.hero_off_screen_sound = new Audio;
        this.hero_off_screen_sound.src = '../assets/sound/bone_breaking.mp3';
        this.hero_off_screen_sound.volume = 1.0;

        this.button_click = new Audio;
        this.button_click.src = '../assets/sound/click.mp3';
        this.button_click.volume = 1.0;
    }

    playHeroOffScreen() {
        this.hero_off_screen_sound.play();
    }

    playButtonClick() {
        this.button_click.play();
    }
};