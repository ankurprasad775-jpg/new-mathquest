/* =========================================================
   ACHIEVEMENTS — Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Animate locked progress bars */
    var fills = document.querySelectorAll(".ach-locked-fill");
    fills.forEach(function (fill, i) {
        var w = fill.style.width;
        fill.style.width = "0%";
        setTimeout(function () { fill.style.width = w; }, 400 + i * 120);
    });

    /* Animate ring */
    var ring = document.querySelector(".ach-ring-fill");
    if (ring) {
        var target = ring.getAttribute("stroke-dashoffset");
        ring.setAttribute("stroke-dashoffset", "264");
        setTimeout(function () { ring.style.strokeDashoffset = target; }, 300);
    }

    /* Badge hover pop */
    var badges = document.querySelectorAll(".ach-badge.earned");
    badges.forEach(function (badge) {
        badge.addEventListener("mouseenter", function () {
            var icon = badge.querySelector(".ach-badge-icon");
            if (icon) { icon.style.transform = "scale(1.15) rotate(5deg)"; }
        });
        badge.addEventListener("mouseleave", function () {
            var icon = badge.querySelector(".ach-badge-icon");
            if (icon) { icon.style.transform = ""; }
        });
    });

});
