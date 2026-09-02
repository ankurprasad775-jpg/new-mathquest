/* =========================================================
   MATHQUEST DASHBOARD
   DASHBOARD.JS — Premium Interactions + Dynamic Section Loading
 ========================================================= */


/* =========================================================
   DOM ELEMENTS
 ========================================================= */

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const menuToggle = document.getElementById("menuToggle");
const mainContent = document.getElementById("mainContent");
const pageTitle = document.getElementById("pageTitle");
const contentArea = document.getElementById("contentArea");


/* =========================================================
   SIDEBAR TOGGLE
 ========================================================= */

function openSidebar() {

    if (!sidebar) return;

    if (window.innerWidth > 1050) {
        sidebar.classList.remove("collapsed");
        if (mainContent) mainContent.classList.remove("expanded");
        if (menuToggle) menuToggle.classList.remove("visible");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    } else {
        if (overlay) overlay.classList.add("active");
        sidebar.classList.add("open");
        document.body.style.overflow = "hidden";
    }

}


function closeSidebar() {

    if (!sidebar) return;

    if (window.innerWidth > 1050) {
        sidebar.classList.add("collapsed");
        if (mainContent) mainContent.classList.add("expanded");
        if (menuToggle) menuToggle.classList.add("visible");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    } else {
        sidebar.classList.remove("open");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

}


function toggleSidebar() {

    if (!sidebar) return;

    if (window.innerWidth > 1050) {
        if (sidebar.classList.contains("collapsed")) {
            openSidebar();
        } else {
            closeSidebar();
        }
    } else {
        if (sidebar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

}


/* =========================================================
   EVENT LISTENERS
 ========================================================= */

if (menuToggle) {
    menuToggle.addEventListener("click", toggleSidebar);
}

if (overlay) {
    overlay.addEventListener("click", closeSidebar);
}


/* =========================================================
   DYNAMIC SECTION LOADING
 ========================================================= */

var loadedSections = {};
var activeSection = "dashboard";
var loadedStyles = {};
var loadedScripts = {};

function loadSectionCSS(sectionName) {
    return new Promise(function (resolve) {
        if (loadedStyles[sectionName]) { resolve(); return; }
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "sections/" + sectionName + "/" + sectionName + ".css";
        link.onload = function () { loadedStyles[sectionName] = true; resolve(); };
        link.onerror = function () { resolve(); };
        document.head.appendChild(link);
    });
}

function loadSectionJS(sectionName) {
    return new Promise(function (resolve) {
        if (loadedScripts[sectionName]) { resolve(); return; }
        var script = document.createElement("script");
        script.src = "sections/" + sectionName + "/" + sectionName + ".js";
        script.onload = function () { loadedScripts[sectionName] = true; resolve(); };
        script.onerror = function () { resolve(); };
        document.body.appendChild(script);
    });
}

function fetchSectionContent(sectionName) {
    return fetch("sections/" + sectionName + "/" + sectionName + ".html")
        .then(function (r) { return r.text(); })
        .then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var sectionEl = doc.querySelector("#section-" + sectionName);
            if (sectionEl) {
                return sectionEl.innerHTML;
            }
            return null;
        })
        .catch(function () { return null; });
}

function loadSection(sectionName) {

    if (!contentArea) return;

    /* Update page title */
    var navItem = document.querySelector('.nav-item[data-section="' + sectionName + '"]');
    var label = navItem ? navItem.querySelector(".nav-label") : null;
    if (label && pageTitle) {
        pageTitle.textContent = label.textContent;
    }

    /* Update subtitle */
    var pageSubtitle = document.querySelector(".page-subtitle");
    if (pageSubtitle) {
        if (sectionName === "dashboard") {
            pageSubtitle.textContent = "Welcome back, Aditya";
        } else {
            pageSubtitle.textContent = label ? label.textContent : "";
        }
    }

    /* Remove all section content */
    var existingSections = contentArea.querySelectorAll(".section");
    existingSections.forEach(function (s) { s.remove(); });

    /* If dashboard, use inline content */
    if (sectionName === "dashboard") {
        var dashSection = document.getElementById("section-dashboard-inline");
        if (dashSection) {
            var newSection = document.createElement("div");
            newSection.className = "section";
            newSection.id = "section-dashboard";
            newSection.innerHTML = dashSection.innerHTML;
            contentArea.appendChild(newSection);
        }
        activeSection = sectionName;
        return;
    }

    /* Check cache */
    if (loadedSections[sectionName]) {
        var cached = document.createElement("div");
        cached.className = "section";
        cached.id = "section-" + sectionName;
        cached.innerHTML = loadedSections[sectionName];
        contentArea.appendChild(cached);
        activeSection = sectionName;
        loadSectionJS(sectionName);
        return;
    }

    /* Fetch and load */
    Promise.all([
        loadSectionCSS(sectionName),
        fetchSectionContent(sectionName)
    ]).then(function (results) {
        var content = results[1];
        if (content) {
            loadedSections[sectionName] = content;
            var newSec = document.createElement("div");
            newSec.className = "section";
            newSec.id = "section-" + sectionName;
            newSec.innerHTML = content;
            contentArea.appendChild(newSec);
            activeSection = sectionName;
            loadSectionJS(sectionName);
        } else {
            /* Fallback empty state */
            var empty = document.createElement("div");
            empty.className = "section";
            empty.id = "section-" + sectionName;
            empty.innerHTML = '<div class="empty-state"><h3 class="empty-title">' + (label ? label.textContent : sectionName) + '</h3><p class="empty-desc">Coming soon!</p></div>';
            contentArea.appendChild(empty);
        }
    });

}


/* =========================================================
   NAV ITEM CLICK — SECTION SWITCHING
 ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Load dashboard content from hidden template */
    var dashInline = document.getElementById("section-dashboard-inline");
    if (dashInline) {
        var dashSection = document.createElement("div");
        dashSection.className = "section";
        dashSection.id = "section-dashboard";
        dashSection.innerHTML = dashInline.innerHTML;
        contentArea.appendChild(dashSection);
    }

    var navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {

        item.addEventListener("click", function (e) {

            e.preventDefault();

            /* Remove active from all */
            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            /* Add active to clicked */
            item.classList.add("active");

            /* Get section name */
            var sectionName = item.getAttribute("data-section");

            /* Load section */
            loadSection(sectionName);

            /* Auto-hide sidebar */
            closeSidebar();

        });

    });

});


/* =========================================================
   ESC KEY — CLOSE / RESTORE SIDEBAR
 ========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    if (window.innerWidth > 1050 && sidebar && sidebar.classList.contains("collapsed")) {
        openSidebar();
    } else {
        closeSidebar();
    }

});


/* =========================================================
   RESIZE HANDLER
 ========================================================= */

window.addEventListener("resize", function () {

    if (!sidebar) return;

    if (window.innerWidth > 1050) {
        sidebar.classList.remove("open");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
        if (sidebar.classList.contains("collapsed")) {
            if (menuToggle) menuToggle.classList.add("visible");
            if (mainContent) mainContent.classList.add("expanded");
        } else {
            if (menuToggle) menuToggle.classList.remove("visible");
            if (mainContent) mainContent.classList.remove("expanded");
        }
    } else {
        sidebar.classList.remove("collapsed");
        if (mainContent) mainContent.classList.remove("expanded");
        if (menuToggle) menuToggle.classList.remove("visible");
        if (overlay) overlay.classList.remove("active");
    }

});


/* =========================================================
   SEARCH BOX SHORTCUT
 ========================================================= */

document.addEventListener("keydown", function (event) {

    if ((event.metaKey || event.ctrlKey) && event.key === "k") {

        event.preventDefault();

        var searchInput = document.querySelector(".search-box input");

        if (searchInput) {
            searchInput.focus();
        }

    }

});
