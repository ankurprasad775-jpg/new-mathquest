/* =========================================================
   PROGRESS — Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Animate progress bars on load */
    var bars = document.querySelectorAll(".prog-bar-fill");
    bars.forEach(function (bar, i) {
        var w = bar.style.width;
        bar.style.width = "0%";
        setTimeout(function () { bar.style.width = w; }, 200 + i * 100);
    });

    /* Animate chart bars */
    var chartBars = document.querySelectorAll(".prog-day-bar");
    chartBars.forEach(function (bar, i) {
        var h = bar.style.height;
        bar.style.height = "0%";
        setTimeout(function () { bar.style.height = h; }, 300 + i * 80);
    });

    /* Animate stat values */
    var statValues = document.querySelectorAll(".prog-stat-value");
    statValues.forEach(function (el) {
        var text = el.textContent;
        var num = parseFloat(text);
        if (isNaN(num)) return;
        var suffix = text.replace(/[0-9.]/g, "");
        var start = 0;
        var duration = 1200;
        var startTime = null;
        function animate(time) {
            if (!startTime) startTime = time;
            var progress = Math.min((time - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(start + (num - start) * eased);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    });

});
