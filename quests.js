/* =========================================================
   QUESTS — Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Animate progress bar */
    var fill = document.querySelector(".quest-progress-fill");
    if (fill) {
        var w = fill.style.width;
        fill.style.width = "0%";
        setTimeout(function () { fill.style.width = w; }, 300);
    }

    /* Button feedback */
    var btns = document.querySelectorAll(".quest-btn-main");
    btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn.textContent = "Loading...";
            setTimeout(function () { btn.textContent = "Continue Quest \u2192"; }, 1500);
        });
    });

});
