(function(window) {

function ProblemPool() {
    throw "ProblemPool cannot be instantiated.";
}

// public static properties:
ProblemPool._active = [];
ProblemPool._pool = [];
ProblemPool.activeCount = 0;

ProblemPool.get = function(text, ans, score) {
    var p;

    if (this._pool.length == 0) {
        p = new Problem(text, ans, score);
    } else {
        p = this._pool.pop();
        p.activate(text, ans, score);
    }

    this._active.push(p);
    this.activeCount++;
    return p;
}

ProblemPool.deactivate = function(p) {
    index = this._active.indexOf(p);
    if (index == -1) return;
    var p = this._active[index];
    this._active.splice(index, 1);

    p.active = false;
    this.activeCount--;
    this._pool.push(p);
}

ProblemPool.clear = function() {
    this._pool = [];
    this._active = [];
    this.activeCount = 0;
}

window.ProblemPool = ProblemPool;

}(window));

