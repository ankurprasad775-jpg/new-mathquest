/* =========================================================
   AI TEACHER — Enhanced Chat Logic
   sections/ai-teacher/script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    var chatMessages = document.getElementById("chatMessages");
    var aiInput = document.getElementById("aiInput");
    var sendBtn = document.getElementById("sendBtn");
    var attachBtn = document.getElementById("attachBtn");
    var attachPopup = document.getElementById("attachPopup");
    var attachClose = document.getElementById("attachClose");
    var attachWrap = document.getElementById("attachWrap");
    var clearChatBtn = document.getElementById("clearChatBtn");
    var emojiBtn = document.getElementById("emojiBtn");
    var emojiPicker = document.getElementById("emojiPicker");
    var emojiGrid = document.getElementById("emojiGrid");
    var emojiSearch = document.getElementById("emojiSearch");
    var topicBtn = document.getElementById("topicBtn");
    var topicChips = document.getElementById("topicChips");
    var filePreview = document.getElementById("filePreview");
    var fileName = document.getElementById("fileName");
    var fileSize = document.getElementById("fileSize");
    var fileRemove = document.getElementById("fileRemove");
    var aiStatus = document.getElementById("aiStatus");
    var inputContainer = document.getElementById("inputContainer");
    var dropzone = document.getElementById("dropzone");

    var pendingFile = null;


    /* =========================================================
       PARTICLE BACKGROUND
    ========================================================= */

    (function initParticles() {
        var canvas = document.getElementById("aiParticles");
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        var particles = [];
        var w, h;

        function resize() {
            w = canvas.width = canvas.parentElement.offsetWidth;
            h = canvas.height = canvas.parentElement.offsetHeight;
        }

        resize();
        window.addEventListener("resize", resize);

        function Particle() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.r = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.3 + 0.1;
        }

        for (var i = 0; i < 40; i++) {
            particles.push(new Particle());
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(99,102,241," + p.alpha + ")";
                ctx.fill();
            });

            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = "rgba(99,102,241," + (0.06 * (1 - dist / 120)) + ")";
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        }

        draw();
    })();


    /* =========================================================
       AUTO-RESIZE TEXTAREA
    ========================================================= */

    if (aiInput) {
        aiInput.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = Math.min(this.scrollHeight, 120) + "px";
            if (sendBtn) sendBtn.disabled = this.value.trim() === "" && !pendingFile;
        });
    }


    /* =========================================================
       SEND MESSAGE
    ========================================================= */

    function sendUserMessage(text, file) {
        var hasText = text && text.trim();
        var hasFile = !!file;
        if (!hasText && !hasFile) return;

        var now = new Date();
        var timeStr = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

        var bubbleContent = "";
        if (hasText) bubbleContent += "<p>" + escapeHTML(text.trim()) + "</p>";
        if (hasFile) {
            var icon = file.type && file.type.indexOf("image") !== -1 ? "&#x1F5BC;&#xFE0F;" : "&#x1F4C4;";
            bubbleContent += '<div class="ai-file-inline">' + icon + " " + escapeHTML(file.name) + "</div>";
        }

        var userMsg = document.createElement("div");
        userMsg.className = "ai-msg ai-msg-user";
        userMsg.innerHTML =
            '<div class="ai-msg-content">' +
                '<div class="ai-msg-bubble">' + bubbleContent + "</div>" +
                '<span class="ai-msg-time">' + timeStr + "</span>" +
            "</div>";

        chatMessages.appendChild(userMsg);
        scrollToBottom();

        if (aiInput) {
            aiInput.value = "";
            aiInput.style.height = "auto";
            aiInput.dispatchEvent(new Event("input"));
        }

        clearFilePreview();
        setStatus("Thinking...");
        showTypingIndicator();

        var delay = 1000 + Math.random() * 1500;
        setTimeout(function () {
            removeTypingIndicator();
            addBotReply(text ? text.trim() : "Thanks for sharing that file! Let me take a look...");
            setStatus("Online \u00B7 Ready to help");
        }, delay);
    }


    function addBotReply(userText) {
        var reply = generateReply(userText);

        var botMsg = document.createElement("div");
        botMsg.className = "ai-msg ai-msg-bot";
        botMsg.innerHTML =
            '<div class="ai-msg-avatar">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>' +
            "</div>" +
            '<div class="ai-msg-content">' +
                '<div class="ai-msg-bubble">' +
                    '<span class="ai-msg-name">MathQuest AI</span>' +
                    reply +
                "</div>" +
                '<span class="ai-msg-time">Just now</span>' +
            "</div>";

        chatMessages.appendChild(botMsg);
        scrollToBottom();
    }


    function generateReply(text) {
        var lower = text.toLowerCase();

        if (lower.indexOf("trig") !== -1 || lower.indexOf("sin") !== -1 || lower.indexOf("cos") !== -1) {
            return '<p>Great question! Trigonometry deals with relationships between angles and sides of triangles.</p>' +
                   '<p>The most fundamental identity is:</p>' +
                   '<div class="ai-code-block"><div class="ai-code-header"><span class="ai-code-lang">Pythagorean Identity</span><button class="ai-copy-btn" data-code="sin\u00B2\u03B8 + cos\u00B2\u03B8 = 1">&#x2398; Copy</button></div><pre><code>sin\u00B2\u03B8 + cos\u00B2\u03B8 = 1</code></pre></div>' +
                   '<p>This is always true for any angle \u03B8. Would you like me to prove it or show examples?</p>';
        }

        if (lower.indexOf("quadratic") !== -1 || lower.indexOf("equation") !== -1) {
            return "<p>Here's the quadratic formula for solving ax\u00B2 + bx + c = 0:</p>" +
                   '<div class="ai-code-block"><div class="ai-code-header"><span class="ai-code-lang">Quadratic Formula</span><button class="ai-copy-btn" data-code="x = (-b \u00B1 \u221A(b\u00B2 - 4ac)) / 2a">&#x2398; Copy</button></div><pre><code>x = (-b \u00B1 \u221A(b\u00B2 - 4ac)) / 2a</code></pre></div>' +
                   "<p>The discriminant (b\u00B2 - 4ac) tells us: positive = 2 solutions, zero = 1 solution, negative = no real solutions. Want to try an example?</p>";
        }

        if (lower.indexOf("mistake") !== -1 || lower.indexOf("error") !== -1) {
            return "<p>Common mistakes I can help you avoid:</p>" +
                   "<p><strong>1.</strong> Forgetting to check domain restrictions<br>" +
                   "<strong>2.</strong> Sign errors when moving terms across =<br>" +
                   "<strong>3.</strong> Incorrect application of identities<br>" +
                   "<strong>4.</strong> Not simplifying final answers</p>" +
                   "<p>Which topic would you like to practice to improve?</p>";
        }

        if (lower.indexOf("hello") !== -1 || lower.indexOf("hi") !== -1) {
            return '<p>Hey there! Ready to tackle some math? Tell me what topic you\'d like to explore or share a problem you\'re working on. &#x1F4AA;</p>';
        }

        if (lower.indexOf("algebra") !== -1) {
            return "<p>Algebra is the language of mathematics! Key topics include:</p>" +
                   "<p><strong>Linear equations:</strong> ax + b = c<br>" +
                   "<strong>Quadratic equations:</strong> ax\u00B2 + bx + c = 0<br>" +
                   "<strong>Polynomials:</strong> Factoring and expansion<br>" +
                   "<strong>Systems:</strong> Solving multiple equations</p>" +
                   '<div class="ai-code-block"><div class="ai-code-header"><span class="ai-code-lang">Example</span><button class="ai-copy-btn" data-code="2x + 5 = 13 -> 2x = 8 -> x = 4">&#x2398; Copy</button></div><pre><code>2x + 5 = 13\n2x = 8\nx = 4</code></pre></div>' +
                   "<p>What specific algebra topic interests you?</p>";
        }

        if (lower.indexOf("calculus") !== -1) {
            return "<p>Calculus is about change and accumulation! Two main branches:</p>" +
                   "<p><strong>Differential:</strong> Rates of change (derivatives)<br>" +
                   "<strong>Integral:</strong> Accumulation (integrals)</p>" +
                   '<div class="ai-code-block"><div class="ai-code-header"><span class="ai-code-lang">Fundamental Theorem</span><button class="ai-copy-btn" data-code="d/dx [F(x)] = f(x)">&#x2398; Copy</button></div><pre><code>d/dx [F(x)] = f(x)\n\u222B f(x) dx = F(x) + C</code></pre></div>' +
                   "<p>Want to explore derivatives or integrals first?</p>";
        }

        if (lower.indexOf("practice") !== -1) {
            return "<p>Let's practice! I'll generate problems based on your level.</p>" +
                   '<div class="ai-code-block"><div class="ai-code-header"><span class="ai-code-lang">Practice Problem</span><button class="ai-copy-btn" data-code="Solve: 3x\u00B2 - 12x + 9 = 0">&#x2398; Copy</button></div><pre><code>Solve: 3x\u00B2 - 12x + 9 = 0</code></pre></div>' +
                   "<p><strong>Hint:</strong> Try factoring out 3 first, then factor the quadratic. Take your time!</p>";
        }

        return "<p>That's a great question! Let me think about this...</p>" +
               "<p>I can help you with step-by-step explanations, practice problems, or identifying mistakes. Could you tell me more about what specific concept you'd like to understand?</p>";
    }


    /* =========================================================
       TYPING INDICATOR
    ========================================================= */

    function showTypingIndicator() {
        if (!chatMessages) return;
        var indicator = document.createElement("div");
        indicator.className = "ai-typing-indicator";
        indicator.id = "typingIndicator";
        indicator.innerHTML =
            '<div class="ai-msg-avatar">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg>' +
            "</div>" +
            '<div class="ai-typing-bubble"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        var indicator = document.getElementById("typingIndicator");
        if (indicator) indicator.remove();
    }


    /* =========================================================
       STATUS
    ========================================================= */

    function setStatus(text) {
        if (aiStatus) aiStatus.innerHTML = '<span class="ai-status-dot"></span> ' + text;
    }


    /* =========================================================
       QUICK ACTIONS
    ========================================================= */

    var quickBtns = document.querySelectorAll(".ai-quick-btn");
    quickBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var msg = btn.getAttribute("data-msg");
            if (msg) sendUserMessage(msg);
        });
    });


    /* =========================================================
       SEND BUTTON + ENTER KEY
    ========================================================= */

    if (sendBtn) {
        sendBtn.addEventListener("click", function () {
            if ((aiInput && aiInput.value.trim()) || pendingFile) {
                sendUserMessage(aiInput ? aiInput.value : "", pendingFile);
            }
        });
    }

    if (aiInput) {
        aiInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if ((aiInput.value.trim()) || pendingFile) {
                    sendUserMessage(aiInput.value, pendingFile);
                }
            }
        });
    }


    /* =========================================================
       ATTACHMENT POPUP
    ========================================================= */

    var attachIsOpen = false;

    function openAttachPopup() {
        if (attachPopup) {
            attachPopup.classList.add("open");
            attachBtn.classList.add("active");
            attachIsOpen = true;
        }
    }

    function closeAttachPopup() {
        if (attachPopup) {
            attachPopup.classList.remove("open");
            attachBtn.classList.remove("active");
            attachIsOpen = false;
        }
    }

    if (attachBtn) {
        attachBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (attachIsOpen) closeAttachPopup();
            else openAttachPopup();
        });
    }

    if (attachClose) {
        attachClose.addEventListener("click", closeAttachPopup);
    }

    document.addEventListener("click", function (e) {
        if (attachIsOpen && attachWrap && !attachWrap.contains(e.target)) {
            closeAttachPopup();
        }
        if (emojiPicker && emojiPicker.classList.contains("open") && !emojiPicker.contains(e.target) && e.target !== emojiBtn && !emojiBtn.contains(e.target)) {
            emojiPicker.classList.remove("open");
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (attachIsOpen) closeAttachPopup();
            if (emojiPicker && emojiPicker.classList.contains("open")) emojiPicker.classList.remove("open");
        }
    });


    /* =========================================================
       ATTACHMENT OPTIONS
    ========================================================= */

    var attachOptions = document.querySelectorAll(".ai-attach-option");
    attachOptions.forEach(function (opt) {
        opt.addEventListener("click", function () {
            var type = opt.getAttribute("data-type");
            closeAttachPopup();

            if (type === "image" || type === "photo") {
                var input = document.createElement("input");
                input.type = "file";
                input.accept = type === "photo" ? "image/*" : "image/*";
                if (type === "photo") input.capture = "environment";
                input.onchange = function () {
                    if (input.files && input.files[0]) {
                        showFilePreview(input.files[0]);
                    }
                };
                input.click();
            } else if (type === "doc") {
                var input2 = document.createElement("input");
                input2.type = "file";
                input2.accept = ".pdf,.doc,.docx,.txt,.ppt,.pptx";
                input2.onchange = function () {
                    if (input2.files && input2.files[0]) {
                        showFilePreview(input2.files[0]);
                    }
                };
                input2.click();
            } else if (type === "equation") {
                if (aiInput) {
                    aiInput.value += "∫ x\u00B2 dx = ";
                    aiInput.focus();
                    aiInput.dispatchEvent(new Event("input"));
                }
            }
        });
    });


    /* =========================================================
       FILE PREVIEW
    ========================================================= */

    function showFilePreview(file) {
        pendingFile = file;
        if (fileName) fileName.textContent = file.name;
        if (fileSize) fileSize.textContent = formatSize(file.size);
        if (filePreview) filePreview.classList.add("visible");
        if (sendBtn) sendBtn.disabled = false;
    }

    function clearFilePreview() {
        pendingFile = null;
        if (filePreview) filePreview.classList.remove("visible");
        if (sendBtn) sendBtn.disabled = aiInput ? aiInput.value.trim() === "" : true;
    }

    if (fileRemove) {
        fileRemove.addEventListener("click", clearFilePreview);
    }

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
    }


    /* =========================================================
       DRAG & DROP
    ========================================================= */

    if (dropzone) {
        dropzone.addEventListener("click", function () {
            var input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*,.pdf,.doc,.docx,.txt";
            input.onchange = function () {
                if (input.files && input.files[0]) {
                    showFilePreview(input.files[0]);
                    closeAttachPopup();
                }
            };
            input.click();
        });

        dropzone.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropzone.style.borderColor = "var(--primary-mid)";
            dropzone.style.background = "var(--primary-light)";
        });

        dropzone.addEventListener("dragleave", function () {
            dropzone.style.borderColor = "";
            dropzone.style.background = "";
        });

        dropzone.addEventListener("drop", function (e) {
            e.preventDefault();
            dropzone.style.borderColor = "";
            dropzone.style.background = "";
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                showFilePreview(e.dataTransfer.files[0]);
                closeAttachPopup();
            }
        });
    }


    /* =========================================================
       EMOJI PICKER
    ========================================================= */

    var emojis = [
        "\u2764\uFE0F","\uD83D\uDE0A","\uD83D\uDE02","\uD83D\uDE0D","\uD83D\uDC4D","\uD83D\uDC4E",
        "\uD83D\uDE2D","\uD83D\uDE31","\uD83E\uDD14","\uD83E\uDD2F","\uD83D\uDCA1","\uD83D\uDE80",
        "\uD83C\uDF89","\uD83C\uDFC6","\uD83E\uDDEA","\uD83E\uDD13","\u270F\uFE0F","\uD83D\uDCDD",
        "\uD83D\uDCD6","\uD83D\uDCDA","\u2699\uFE0F","\uD83D\uDEE0\uFE0F","\uD83E\uDDE9","\uD83C\uDFAF",
        "\u2B50","\uD83D\uDCAF","\uD83D\uDD25","\uD83D\uDCA2","\uD83C\uDF1F","\uD83C\uDF08",
        "\u2600\uFE0F","\u2744\uFE0F","\uD83C\uDF3B","\uD83C\uDF33","\uD83C\uDF3A","\uD83C\uDF38",
        "\uD83E\uDD8B","\uD83D\uDC1E","\uD83D\uDC3B","\uD83D\uDC36","\uD83D\uDC31","\uD83E\uDD81",
        "\uD83E\uDD84","\uD83D\uDC2C","\uD83D\uDC2D","\uD83E\uDD8C","\uD83E\uDD85","\uD83E\uDD8A",
        "\u2764\uFE0F","\uD83D\uDC9B","\uD83D\uDC9A","\uD83D\uDC99","\uD83D\uDC9C","\uD83D\uDC95",
        "\uD83D\uDC8E","\uD83D\uDC8D","\uD83D\uDC8C","\uD83D\uDC8B","\uD83D\uDC86","\uD83D\uDC85",
        "\uD83D\uDC84","\uD83D\uDC87","\uD83D\uDC88","\uD83D\uDC89","\uD83E\uDE7A","\uD83E\uDD76",
        "\uD83D\uDC63","\uD83D\uDC40","\uD83D\uDC42","\uD83D\uDC43","\uD83D\uDC64","\uD83D\uDC65",
        "\uD83D\uDC66","\uD83D\uDC67","\uD83D\uDC68","\uD83D\uDC69","\uD83D\uDC70","\uD83D\uDC71",
        "\uD83D\uDC72","\uD83D\uDC73","\uD83D\uDC74","\uD83D\uDC75","\uD83E\uDDD1","\uD83E\uDDD2",
        "\uD83E\uDDD3","\uD83E\uDDD4","\uD83E\uDDD5","\uD83E\uDDD6","\uD83E\uDDD7","\uD83E\uDDD8",
        "\uD83D\uDC76","\uD83D\uDC77","\uD83D\uDC78","\uD83E\uDDDB","\uD83D\uDC7A","\uD83E\uDDDC",
        "\uD83E\uDDDD","\uD83E\uDDDE","\uD83E\uDDDF","\uD83E\uDEDE","\uD83D\uDC80","\uD83E\uDD11",
        "\uD83E\uDD12","\uD83E\uDD15","\uD83D\uDC8A","\uD83D\uDC8C","\uD83D\uDCA1","\uD83D\uDCAB",
        "\uD83D\uDCA3","\uD83D\uDCA5","\uD83D\uDCA7","\uD83E\uDDE4","\uD83D\uDCAF","\uD83E\uDDE1",
        "\uD83D\uDCA6","\uD83D\uDCA8","\uD83E\uDD75","\uD83E\uDD76","\uD83E\uDD7A","\uD83E\uDD74",
        "\uD83D\uDE0B","\uD83D\uDE0C","\uD83D\uDE0D","\uD83E\uDD29","\uD83E\uDD73","\uD83D\uDE18",
        "\uD83D\uDE19","\uD83D\uDE0A","\uD83E\uDD72","\uD83D\uDE0E","\uD83E\uDD78","\uD83E\uDD7D",
        "\uD83D\uDE1C","\uD83E\uDD28","\uD83D\uDE10","\uD83D\uDE11","\uD83D\uDE15","\uD83D\uDE14",
        "\uD83E\uDD24","\uD83D\uDE16","\uD83D\uDE17","\uD83D\uDE1A","\uD83D\uDE0F","\uD83D\uDE21",
        "\uD83E\uDD2C","\uD83D\uDE34","\uD83E\uDD71","\uD83E\uDD7F","\uD83E\uDD26","\uD83D\uDE06",
        "\uD83D\uDE44","\uD83D\uDC4A","\uD83E\uDD1F","\uD83D\uDC4B","\uD83E\uDD18","\uD83E\uDD19",
        "\uD83D\uDC48","\uD83D\uDC49","\uD83E\uDD1E","\uD83D\uDC4C","\uD83E\uDD1C","\uD83D\uDC4D",
        "\uD83D\uDC4E","\uD83D\uDC4F","\uD83E\uDD1A","\uD83D\uDC50","\uD83E\uDD32","\uD83E\uDD1D",
        "\u270B","\uD83D\uDD90\uFE0F","\uD83D\uDD96","\uD83E\uDEDB","\uD83E\uDEDC","\uD83D\uDC46",
        "\uD83D\uDC47","\uD83D\uDC49","\uD83E\uDD0F","\u261D\uFE0F","\uD83D\uDC44","\uD83E\uDD22",
        "\uD83E\uDD2E","\uD83E\uDD27","\uD83E\uDD34","\uD83E\uDD35","\uD83E\uDD24","\uD83E\uDD37",
        "\uD83E\uDD38","\uD83E\uDD39","\uD83E\uDD3D","\uD83E\uDD3E","\uD83E\uDD3F","\uD83D\uDC45",
        "\uD83E\uDD12","\uD83E\uDD13","\uD83D\uDC46","\uD83D\uDC47","\uD83D\uDC48","\uD83D\uDC49",
        "\uD83D\uDC4A","\u270A","\uD83E\uDD1B","\uD83E\uDD1C","\uD83D\uDC4B","\u270C\uFE0F",
        "\uD83E\uDD1E","\uD83D\uDC4C","\uD83D\uDC4D","\uD83D\uDC4E","\uD83D\uDC4F","\uD83E\uDD18",
        "\uD83E\uDD19","\uD83E\uDD1A","\u270B","\uD83D\uDD90\uFE0F","\uD83D\uDD96","\u261D\uFE0F",
        "\uD83D\uDC46","\uD83D\uDC47","\uD83E\uDD0F","\uD83E\uDD1F","\uD83D\uDC48","\uD83D\uDC49",
        "\uD83E\uDD33","\uD83E\uDD1E","\uD83E\uDD35","\uD83E\uDD37","\uD83E\uDD38","\uD83E\uDD39",
        "\uD83E\uDD3D","\uD83E\uDD3E","\uD83E\uDD3F","\uD83E\uDD73","\uD83E\uDD7A","\uD83E\uDD34",
        "\uD83E\uDD32","\uD83E\uDD11","\uD83E\uDD12","\uD83E\uDD13","\uD83E\uDD3B","\uD83E\uDD3C",
        "\uD83E\uDD1D","\uD83D\uDC50","\uD83E\uDD26","\uD83E\uDD35","\uD83D\uDC85","\uD83D\uDC84",
        "\uD83D\uDC87","\uD83D\uDC86","\uD83D\uDC88","\uD83D\uDC89","\uD83D\uDC8A","\uD83D\uDC8B",
        "\uD83E\uDE7A","\uD83E\uDD76","\uD83D\uDCA1","\uD83D\uDCAB","\uD83D\uDCAC","\uD83E\uDD2A",
        "\uD83D\uDE24","\uD83D\uDE25","\uD83E\uDD20","\uD83E\uDD21","\uD83E\uDD23","\uD83D\uDE0A",
        "\uD83D\uDE07","\uD83D\uDE06","\uD83E\uDD70","\uD83D\uDE0F","\uD83D\uDE1C","\uD83E\uDD28",
        "\uD83D\uDE0D","\uD83E\uDD29","\uD83E\uDD73","\uD83D\uDE18","\uD83D\uDE19","\uD83E\uDD72",
        "\uD83D\uDE0E","\uD83E\uDD78","\uD83E\uDD7D","\uD83D\uDE14","\uD83D\uDE10","\uD83D\uDE11",
        "\uD83D\uDE15","\uD83E\uDD24","\uD83D\uDE16","\uD83D\uDE17","\uD83D\uDE1A","\uD83E\uDD25",
        "\uD83D\uDE22","\uD83D\uDE23","\uD83D\uDE28","\uD83D\uDE29","\uD83D\uDE2C","\uD83D\uDE30",
        "\uD83D\uDE31","\uD83D\uDE33","\uD83D\uDE35","\uD83E\uDD11","\uD83E\uDD12","\uD83E\uDD15",
        "\uD83E\uDD22","\uD83E\uDD2E","\uD83E\uDD27","\uD83E\uDD75","\uD83E\uDD76","\uD83E\uDD7A",
        "\uD83E\uDD74","\uD83E\uDD2F","\uD83E\uDD13","\uD83D\uDCA1","\uD83D\uDCAB","\uD83D\uDCA5",
        "\uD83D\uDCA3","\uD83D\uDCA7","\uD83E\uDDE4","\uD83D\uDCAF","\uD83E\uDDE1","\uD83D\uDCA6",
        "\uD83E\uDD75","\uD83D\uDE0B","\uD83D\uDE0C","\uD83D\uDE0D","\uD83E\uDD29","\uD83E\uDD73"
    ];

    if (emojiGrid) {
        emojis.forEach(function (emoji) {
            var btn = document.createElement("button");
            btn.className = "ai-emoji-item";
            btn.textContent = emoji;
            btn.addEventListener("click", function () {
                if (aiInput) {
                    aiInput.value += emoji;
                    aiInput.focus();
                    aiInput.dispatchEvent(new Event("input"));
                }
            });
            emojiGrid.appendChild(btn);
        });
    }

    if (emojiBtn) {
        emojiBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (emojiPicker) emojiPicker.classList.toggle("open");
        });
    }

    if (emojiSearch) {
        emojiSearch.addEventListener("input", function () {
            var items = emojiGrid.querySelectorAll(".ai-emoji-item");
            items.forEach(function (item) {
                item.style.display = "";
            });
        });
    }


    /* =========================================================
       TOPIC CHIPS
    ========================================================= */

    if (topicBtn) {
        topicBtn.addEventListener("click", function () {
            if (topicChips) topicChips.classList.toggle("open");
        });
    }

    var topicChipBtns = document.querySelectorAll(".ai-topic-chip");
    topicChipBtns.forEach(function (chip) {
        chip.addEventListener("click", function () {
            topicChipBtns.forEach(function (c) { c.classList.remove("active"); });
            chip.classList.add("active");
            var topic = chip.getAttribute("data-topic");
            sendUserMessage("I want to learn about " + topic);
            if (topicChips) topicChips.classList.remove("open");
        });
    });


    /* =========================================================
       CLEAR CHAT
    ========================================================= */

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", function () {
            if (chatMessages) chatMessages.innerHTML = "";

            var welcome = document.createElement("div");
            welcome.className = "ai-welcome-card";
            welcome.innerHTML =
                '<div class="ai-welcome-glow"></div>' +
                '<div class="ai-welcome-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><rect x="2" y="14" width="20" height="8" rx="2"/></svg></div>' +
                '<h3 class="ai-welcome-title">MathQuest AI</h3>' +
                '<p class="ai-welcome-desc">Chat cleared! What would you like to learn next?</p>' +
                '<div class="ai-welcome-tags"><span class="ai-tag">\uD83D\uDCD6 Concepts</span><span class="ai-tag">\u270F\uFE0F Problems</span><span class="ai-tag">\uD83E\uDDE9 Mistakes</span><span class="ai-tag">\uD83C\uDFAF Practice</span></div>';

            chatMessages.appendChild(welcome);

            var quick = document.createElement("div");
            quick.className = "ai-quick-actions";
            quick.innerHTML =
                '<button class="ai-quick-btn" data-msg="Explain trigonometric identities"><span class="ai-quick-icon">\uD83D\uDCD6</span> Explain Trig Identities</button>' +
                '<button class="ai-quick-btn" data-msg="Solve: sin\u00B2\u03B8 + cos\u00B2\u03B8 = ?"><span class="ai-quick-icon">\u270F\uFE0F</span> Solve a Problem</button>' +
                '<button class="ai-quick-btn" data-msg="Show common mistakes in trigonometry"><span class="ai-quick-icon">\uD83E\uDDE0</span> Find My Mistakes</button>' +
                '<button class="ai-quick-btn" data-msg="I want to practice quadratic equations"><span class="ai-quick-icon">\uD83C\uDFAF</span> Start Practice</button>';
            chatMessages.appendChild(quick);

            quick.querySelectorAll(".ai-quick-btn").forEach(function (btn) {
                btn.addEventListener("click", function () {
                    var msg = btn.getAttribute("data-msg");
                    if (msg) sendUserMessage(msg);
                });
            });
        });
    }


    /* =========================================================
       COPY CODE
    ========================================================= */

    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".ai-copy-btn");
        if (!btn) return;
        var code = btn.getAttribute("data-code");
        if (!code) return;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(function () {
                var orig = btn.innerHTML;
                btn.textContent = "Copied!";
                btn.classList.add("copied");
                setTimeout(function () {
                    btn.innerHTML = "\u2398 Copy";
                    btn.classList.remove("copied");
                }, 2000);
            });
        }
    });


    /* =========================================================
       HELPERS
    ========================================================= */

    function scrollToBottom() {
        if (chatMessages) {
            setTimeout(function () {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 50);
        }
    }

    function escapeHTML(str) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

});
