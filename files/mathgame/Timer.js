(function(window) {

function Timer() {
    throw "Timer cannot be instantiated.";
}

// public static properties:
Timer._periods = null;
Timer._callbacks = null;
Timer._next = null;
Timer._inited = false;

Timer.init = function() {
    Timer._inited = true;
    Timer._periods = [];
    Timer._callbacks = [];
    Timer._next = [];
}

Timer.each = function(period, func) {
    if (!Timer._inited) Timer.init();
    Timer._periods[Timer._callbacks.length] = period;
    Timer._next[Timer._callbacks.length] = createjs.Ticker.getTime(false) + period;
    Timer._callbacks.push(func);
}

Timer.tick = function() {
    var t = createjs.Ticker.getTime(false);

    for (var i in Timer._next) {
        if (t >= Timer._next[i]) {
            Timer._next[i] = t + Timer._periods[i];
            Timer._callbacks[i]();
        }
    }
}

window.Timer = Timer;

}(window));
