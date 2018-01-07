(function(window) {

//
function Problem(text, ans, score) {
    this.initialize(text, ans, score);
}

var p = Problem.prototype = new createjs.Text("1+1", "bold 20px Monospace", "#000");

// static properties:
    Problem.SOME_CONST = 40;

// public properties:
    p.velocity; //velocity Y
    p.text;     //problem text
    p.answer;   //answer for the problem
    p.score;    //score for the problem
    p.solved;   //is it solved
    p.active;   //true if problem is in use

// constructor:
    p.Text_initialize = p.initialize;	//unique to avoid overiding base class
    
    p.initialize = function(text, ans, score) {
        this.Text_initialize(); // super call
        this.activate(text, ans, score);
    }

// public methods:

    p.activate = function(text, ans, score) {
        this.color = createjs.Graphics.getHSL(utils.randInt(0, 360), utils.randInt(64,100), utils.randInt(24,42));
        //this.color = createjs.Graphics.getHSL(utils.randInt(0, 360), 100, 40);
        this.font = "bold 20px Monospace"
        
        this.velocity = 0.05;
        this.text = text;
        this.answer = ans;
        this.score = score;
        this.solved = false;
        
        this.y = -this.getMeasuredLineHeight();
        this.x = Math.floor(Math.random() * (600 - this.getMeasuredWidth()) );

        //TODO: Add cache;

        this.active = true;
    }
    //
    p.checkAnswer = function(ans) {
        if (!this.active) return false;
        if (this.answer == ans) {
            this.solved = true;
            return true;
        }
        return false;
    }

    //handle what a Problem does to itself every frame
    p.onTick = function(timeElapsed) {
        this.y += this.velocity * timeElapsed;
    }

window.Problem = Problem;

}(window));
