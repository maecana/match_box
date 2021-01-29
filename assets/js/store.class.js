export default class Store {
    constructor (hs) {
        this.highScore = hs;
    }
    
    // save high score to local storage
    saveHighScore(hs) {
        if(typeof(Storage) !== undefined) {
            let localHs = this.fetchHighScore();

            if(localHs < hs) {
                localStorage.setItem('high_score', hs);
            }
        }
    }

    // fetch high score from local storage
    fetchHighScore() {
        if(typeof(Storage) !== undefined) {
            let localHighScore = localStorage.getItem("high_score");
            if(localHighScore != undefined || localHighScore != null) {
                return localHighScore;
            } else { return 0; }
        } else { return 0; }
    }

    // reset high score in local storage
    resetHighScore() {
        if(typeof(Storage) !== undefined) {
            let localHighScore = this.fetchHighScore();
            if(localHighScore != undefined || localHighScore != null) {
                this.saveHighScore(0);
            }
        }
    }

    // set high score variable
    setHighScore() {
        if(typeof(Storage) !== undefined) {
            let localHighScore = this.fetchHighScore();
            if(localHighScore != undefined || localHighScore != null) {
                this.highScore = this.fetchHighScore();
            }
        }
    }

    // display high score
    displayHighScore() {
        const highScoreEl = document.querySelector('#canvasHighScore');
        highScoreEl.innerHTML = this.fetchHighScore();
    }
}