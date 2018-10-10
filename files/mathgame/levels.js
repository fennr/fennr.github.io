// Different difficulties

(function(window) {

function genSum(difficulty) {
    var l = Math.floor(1.5 * difficulty);
    var r = 10 + 2 * difficulty
    var a = utils.randInt(l, r);
    var b = utils.randInt(l, r);
    return [a + " + " + b + " = ?", a + b];
}

function genSub(difficulty) {
    var l1 = Math.floor(8 + 1.2 * difficulty);
    var r1 = Math.floor(14 + 2 * difficulty);
    var l2 = Math.floor(1 + 0.5*difficulty);
    var r2 = Math.floor(8 + 1.2 * difficulty);
    var a = utils.randInt(l1, r1);
    var b = utils.randInt(l2, r2);
    return [a + " - " + b + " = ?", a - b];
}

function genSqr(difficulty) {
    var l = Math.floor(2 + 0.3 * difficulty);
    var r = Math.floor(7 + 1.3*difficulty);
    var a = utils.randInt(l, r);
    return [a + " * " + a + " = ?", a*a];
}

function genMult(difficulty) {
    var l = 3;
    var r = 7 + difficulty;
    var a = utils.randInt(l, r);
    var b = utils.randInt(l, r);
    return [a + " * " + b + " = ?", a * b];
}

function genDiv(difficulty) {
    var d = Math.max(0, difficulty - 4);
    var ans = utils.randInt(2, Math.floor(8 +0.6 * d));
    var b = utils.randInt(2, Math.floor(8 + 0.6 * d));
    var a = ans*b;
    return [a + " / " + b + " = ?", ans];
}

function _generateProblem(operators, difficulty) {
    var c = operators[utils.randInt(0, operators.length - 1)];
    switch (c) {
        case '+':
            return genSum(difficulty);
        case '-':
            return genSub(difficulty);
        case 's':
            return genSqr(difficulty);
        case '*':
            return genMult(difficulty);
        case '/':
            return genDiv(difficulty);
    }
}

function generateProblem(difficulty) {
    if (difficulty <= 2)
        return _generateProblem("++-s", difficulty);
    
    if (difficulty <= 4)
        return _generateProblem("++--s*", difficulty);
    
    if (difficulty <= 8)
        return _generateProblem("++--ss*/", difficulty);
    
    if (difficulty <= 12)
        return _generateProblem("+-*/s", difficulty);
        
    return _generateProblem("++--*ss//", difficulty);
}

window.generateProblem = generateProblem;

//window.levels = levels;

}(window));
