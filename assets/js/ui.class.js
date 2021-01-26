export default class UIScript {
    constructor() {
        this.hero_off_screen_sound = new Audio;
        this.hero_off_screen_sound.src = '../assets/sound/bone_breaking.mp3';
        this.hero_off_screen_sound.volume = 1.0;

        this.hero_stranger_sound = new Audio;
        this.hero_stranger_sound.src = '../assets/sound/bubble_pop.mp3';
        this.hero_stranger_sound.volume = 1.0;
    }

    playHeroOffScreen() {
        this.hero_off_screen_sound.play();
    }

    playHeroStranger() {
        this.hero_stranger_sound.play();
    }
};