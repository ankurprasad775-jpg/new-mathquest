/* =========================================================
   SETTINGS — Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Theme Switching */
    var themeBtns = document.querySelectorAll(".settings-theme");
    themeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            themeBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
        });
    });

    /* Toggle sound feedback */
    var toggles = document.querySelectorAll(".settings-toggle input");
    toggles.forEach(function (toggle) {
        toggle.addEventListener("change", function () {
            if (this.checked) {
                this.parentElement.querySelector(".settings-slider").style.transform = "none";
            }
        });
    });

    /* Button click feedback */
    var btns = document.querySelectorAll(".settings-btn-sm, .settings-btn-danger");
    btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn.style.transform = "scale(0.95)";
            setTimeout(function () { btn.style.transform = ""; }, 150);
        });
    });

});
