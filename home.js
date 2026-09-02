/* =========================================================
   MATHQUEST HOME PAGE
   HOME.JS
========================================================= */


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function goToLogin() {

    window.location.href = "login.html";

}


function goToSignup() {

    window.location.href = "dashboard.html";

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");
    const actions = document.querySelector(".nav-actions");

    if (!nav) {
        return;
    }

    nav.classList.toggle("mobile-active");

    if (actions) {
        actions.classList.toggle("mobile-active");
    }

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const nav = document.querySelector(".nav-links");
            const actions = document.querySelector(".nav-actions");

            if (nav) {
                nav.classList.remove("mobile-active");
            }

            if (actions) {
                actions.classList.remove("mobile-active");
            }

        });

    });

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (!navbar) {
        return;
    }

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   REVEAL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(
        ".feature-card, .journey-step, .dna-card, .ai-content"
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

});


/* =========================================================
   HERO LOAD ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const heroContent =
        document.querySelector(".hero-content");

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroContent) {

        setTimeout(function () {

            heroContent.classList.add("hero-visible");

        }, 100);

    }


    if (heroVisual) {

        setTimeout(function () {

            heroVisual.classList.add("hero-visible");

        }, 250);

    }

});


/* =========================================================
   FEATURE CARD INTERACTION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const cards =
        document.querySelectorAll(".feature-card");


    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            card.classList.add("active-card");

        });


        card.addEventListener("mouseleave", function () {

            card.classList.remove("active-card");

        });

    });

});


/* =========================================================
   CURRENT YEAR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footerCopy =
        document.querySelector(".footer-copy");


    if (footerCopy) {

        const year = new Date().getFullYear();

        footerCopy.innerHTML =
            `© ${year} MathQuest.
             Built for smarter learning.`;

    }

});


/* =========================================================
   ESC KEY — CLOSE MOBILE MENU
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") {
        return;
    }


    const nav =
        document.querySelector(".nav-links");

    const actions =
        document.querySelector(".nav-actions");


    if (nav) {

        nav.classList.remove("mobile-active");

    }


    if (actions) {

        actions.classList.remove("mobile-active");

    }

});