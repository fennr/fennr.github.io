// namespace
this.stats = this.stats || {};

(function(stats) {
    var dg; //Dygraph control
    var dgDiv;

    stats.stats = [];
    
    stats.init = function(divName) {
        getStats();
        
        dgDiv = document.getElementById(divName);
        dg = new Dygraph(
            dgDiv,
            stats.stats,
            {
                title: "Scores<br><small>Press Enter to play once more!</small>",
                titleHeight: 42,
                labels: ["Date", "Difficulty", "Score"]
            });
    }
    
    stats.push = function(date, difficulty, score) {
        stats.stats.push([date, difficulty, score]);
        localStorage.setItem('stats', JSON.stringify(stats.stats));
        dg.updateOptions({file: stats.stats});
        dg.resetZoom();
    }
    
    function getStats() {
        function dateReviver(key, value) {
            var a;
            if (typeof value === 'string') {
                var dateVal = Date.parse(value);
                if (!isNaN(dateVal)) {
                    return new Date(dateVal);
                }
            }
            return value;
        }

        var data = localStorage.getItem('stats');
        if (data === null) {
            stats.stats = [
                [ new Date(), 0, 0]
            ];
        } else {
            stats.stats = JSON.parse(data, dateReviver);
            console.log(stats.stats);
        }
    }

}(window.stats))
