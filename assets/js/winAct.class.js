export default class WinAct {
    vis = () => {
        var stateKey, eventKey, keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function(c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    };

    detectChange = () => {
        var visible = this.vis();
        
        visible(function(){
            let winState = visible();
            if(winState) {
                // Visible
                // this.continueGame();
                console.log("vis");
            } else {
                // Not visible
                // this.pauseGame();

                console.log("no vis");
            }
        });
    }

    continueGame = () => {
        
    }

    pauseGame = () => {

    }
}