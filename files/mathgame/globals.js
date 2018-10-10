//constants
    var MAX_DIFFICULTY = 20;
    var MAX_LIVES = 5;
    var PROBLEM_INTERVAL = 1400.0; // time in milliseconds until new problem appears
    var DIFFICULTY_INTERVAL = 10000.0; // time in milliseconds until difficulty increases
    
//globals
    var canvas;
    var stage;

    var fpsLabel;
    var difficultyLabel;
    var scoreLabel;
    var livesLabel;
    var msgLabel;

    var difficulty;
    var maxActiveProblems; // max problems on screen at one time, changes with difficulty
    var lives;
    var score;

    var inGame; //true if game is running, false if player loosed or waiting to start the game
