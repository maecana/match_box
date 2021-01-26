export default class UIScript {
    constructor() {
        this.hero_off_screen_sound = new Audio;
        this.hero_off_screen_sound.src = '../assets/sound/bone_breaking.mp3';
        this.hero_off_screen_sound.volume = 1.0;
    }

    playHeroOffScreen() {
        this.hero_off_screen_sound.play();
    }
};