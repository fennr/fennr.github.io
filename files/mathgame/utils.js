// namespace
this.utils = this.utils || {};

(function(utils) {
    utils.randInt = function(min, max) { // [min, max]
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    utils.showDiv = function(id){ SetVisibility(id, "visible"); }
    utils.hideDiv = function(id){ SetVisibility(id, "hidden"); }
    /*utils.showDiv = function(id){ SetDisplay(id, "block"); }
    utils.hideDiv = function(id){ SetDisplay(id, "none"); }*/

    utils.isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    utils.watchEnter = function(callback) { 
        document.onkeydown = function(e) {
            if (e.keyCode == 13 /* Enter */) {
                document.onkeydown = null;
                callback();
            }
        }
    }

    //private methods

    function SetDisplay(id, value) {
        var o = document.getElementById(id);
        if(!o) return false;
        o.style.display = value;
        return true;
    }

    function SetVisibility(id, value) {
        var o = document.getElementById(id);
        if(!o) return false;
        o.style.visibility = value;
        return true;
    }

}(window.utils));
