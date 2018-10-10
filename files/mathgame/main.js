function initLabels() {
    fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#A22");

    fpsLabel.x = 20;
    fpsLabel.y = 40;
    fpsLabel.onTick = function() {
        fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";
    }

    scoreLabel = new createjs.Text("Score: ","bold 18px Arial","#222");
    scoreLabel.x = canvas.width - 160;
    scoreLabel.y = 20;
    
    difficultyLabel = new createjs.Text("Difficulty: ","bold 18px Arial","#222");
    difficultyLabel.x = 20;
    difficultyLabel.y = 20;
    
    livesLabel = new createjs.Text("","bold 18px Arial","#222");
    livesLabel.x = canvas.width - 160;
    livesLabel.y = 40;
    
    msgLabel = new createjs.Text("Press Enter to start","bold 24px Arial","#333");
    msgLabel.maxWidth = canvas.width - 200;
    msgLabel.textAlign = "center";
    msgLabel.textBaseline = "middle";
    msgLabel.x = canvas.width / 2;
    msgLabel.y = canvas.height / 2;
}

function initTicker() {
    createjs.Ticker.removeAllListeners();
    Timer.init();
    createjs.Ticker.addListener(Timer);
}

function init() {
    inGame = false;
    
    //find canvas and load images, wait for last image to load
    canvas = document.getElementById("drawArea");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);

    initLabels();
    initTicker();
    stats.init("dgStats");

    msgLabel.text = "Press Enter to start!";
    stage.addChild(msgLabel);
    stage.update();
   
    utils.watchEnter(startGame);
}

function watchStart() {
    document.onkeydown = function(e) {
        if (e.keyCode == 13 /* Enter */) {
            document.onkeydown = null;
            startGame();
        }
    }
}

function startGame() {
    initTicker();
    stage.removeAllChildren();
    ProblemPool.clear();
    
    setDifficulty(1);
    setLives(MAX_LIVES);
    setScore(0);
    
    stage.addChild(fpsLabel);
    stage.addChild(difficultyLabel);
    stage.addChild(scoreLabel);
    stage.addChild(livesLabel);
    
    Timer.each(DIFFICULTY_INTERVAL, function() {
        if (difficulty < MAX_DIFFICULTY)
            setDifficulty(difficulty + 1);
    })

    Timer.each(PROBLEM_INTERVAL, function() {
        if (ProblemPool.activeCount < maxActiveProblems) {
            var data = generateProblem(difficulty);
            var p = ProblemPool.get(data[0], data[1], difficulty*1);
            stage.addChild(p);
        }
    })

    utils.hideDiv("statsScreen");
    utils.showDiv("drawArea");
    utils.showDiv("gameScreen");
    document.getElementById("answer").focus();

    createjs.Ticker.addListener(gameTick);

    inGame = true;
}

function endGame() {
    inGame = false;
    utils.hideDiv("gameScreen");
    msgLabel.text = "This is the END!\n Your score: " + (score).toString() + "\nPress Enter to view statistics.";
    stage.addChild(msgLabel);
    
    stats.push(new Date(), difficulty, score);
    utils.watchEnter(showStats);
}

function showStats() {
    utils.hideDiv("drawArea");
    utils.hideDiv("gameScreen");
    utils.showDiv("statsScreen");
    utils.watchEnter(startGame);
}

function gameTick(timeElapsed) {
    var problems = ProblemPool._active;
    for (var index in problems) {
        var p = problems[index];
        
        if (p.solved) {
            stage.removeChild(p);
            setScore(score + p.score);
            ProblemPool.deactivate(p);
            continue;
        }

        if (p.y > canvas.height) {
            stage.removeChild(p);
            ProblemPool.deactivate(p);
            if (inGame)
                --lives;
        }
    }

    if (inGame) {
        setLives(Math.max(lives, 0));
        if (lives == 0)
            endGame();
    }

    //update stage
    stage.update(timeElapsed);
}

function setDifficulty(val) {
    difficulty = val;
    maxActiveProblems = Math.floor(2*Math.sqrt(val-0.6));
    difficultyLabel.text = "Difficulty: " + (val).toString();
}

function setLives(val) {
    lives = val;
    livesLabel.text = "Lives: " + (val).toString();
}

function setScore(val) {
    score = val;
    scoreLabel.text = "Score: " + (val).toString();
}

function SubmitAnswer(ans) {
    if (!inGame) return;

    var somethingSolved = false;
    var problems = ProblemPool._active;
    for (var i in problems) {
        var p = problems[i];
        somethingSolved = p.checkAnswer(ans) || somethingSolved;
    }

    if (!somethingSolved)
        --lives;
}


