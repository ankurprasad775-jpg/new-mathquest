/* =========================================================
   LEARNING DNA — Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Animate mastery bars */
    var fills = document.querySelectorAll(".dna-mastery-fill");
    fills.forEach(function (fill, i) {
        var w = fill.style.width;
        fill.style.width = "0%";
        setTimeout(function () { fill.style.width = w; }, 400 + i * 100);
    });

    /* Button feedback */
    var btns = document.querySelectorAll(".dna-rec-btn");
    btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn.textContent = "Loading...";
            setTimeout(function () { btn.textContent = "Start \u2192"; }, 1500);
        });
    });

    /* Helix pause on hover */
    var helix = document.getElementById("dnaHelix");
    if (helix) {
        helix.addEventListener("mouseenter", function () { helix.style.animationPlayState = "paused"; });
        helix.addEventListener("mouseleave", function () { helix.style.animationPlayState = "running"; });
    }

});
