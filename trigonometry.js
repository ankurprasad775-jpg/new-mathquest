// ============================================================
// MATHQUEST - TRIGONOMETRY
// TOPIC 1 & 2 STEP-BY-STEP + 5 QUESTION QUIZ
// ============================================================


// ============================================================
// USER PROGRESS
// ============================================================

let trigProgress = {

    xp: 120,

    completedTopics: [1],

    currentTopic: 2

};


// ============================================================
// CURRENT LEARNING STATE
// ============================================================

let currentTopicNumber = null;

let currentStep = 0;

let currentQuizQuestion = 0;

let currentQuizScore = 0;


// ============================================================
// TOPICS
// ============================================================

const topics = {

    // ========================================================
    // TOPIC 1
    // ========================================================

    1: {

        title: "Introduction to Trigonometry",

        description:
            "Understand what trigonometry is and why we use it.",

        steps: [

            {
                title: "What is Trigonometry?",

                content: `

                    <div class="learn-visual">

                        <h2>📐 What is Trigonometry?</h2>

                        <p>
                            Trigonometry is a branch of mathematics
                            that studies the relationship between
                            <strong>angles</strong> and
                            <strong>sides of triangles</strong>.
                        </p>

                        <div class="info-box">

                            💡 <strong>Simple meaning:</strong>

                            Trigonometry helps us find unknown
                            sides or angles of a triangle.

                        </div>

                    </div>

                `

            },


            {
                title: "Understanding Angles",

                content: `

                    <div class="learn-visual">

                        <h2>📏 Understanding Angles</h2>

                        <p>
                            An angle is formed when two rays meet
                            at a common point.
                        </p>

                        <div class="angle-simple-diagram">

                            <div class="angle-ray ray-one"></div>

                            <div class="angle-ray ray-two"></div>

                            <span class="angle-point">
                                O
                            </span>

                            <span class="angle-label">
                                θ
                            </span>

                        </div>

                        <div class="info-box">

                            📌 The common point is called the
                            <strong>vertex</strong>.

                            <br><br>

                            Angles can be measured in
                            <strong>degrees</strong> and
                            <strong>radians</strong>.

                        </div>

                    </div>

                `

            },


            {
                title: "Triangle and Its Sides",

                content: `

                    <div class="learn-visual">

                        <h2>🔺 Triangle and Its Sides</h2>

                        <p>
                            A triangle has three sides and three
                            angles.
                        </p>

                        <div class="info-box">

                            🔹 <strong>Hypotenuse</strong>

                            <br>
                            The longest side of a right-angled triangle.

                            <br><br>

                            🔹 <strong>Opposite</strong>

                            <br>
                            The side opposite to the angle θ.

                            <br><br>

                            🔹 <strong>Adjacent</strong>

                            <br>
                            The side next to angle θ,
                            excluding the hypotenuse.

                        </div>

                    </div>

                `

            },


            {
                title: "Right-Angled Triangle",

                content: `

                    <div class="learn-visual">

                        <h2>📐 Right-Angled Triangle</h2>

                        <p>
                            A right-angled triangle has one angle
                            exactly equal to
                            <strong>90°</strong>.
                        </p>

                        <div class="info-box">

                            ⭐ The 90° angle is called the
                            <strong>right angle</strong>.

                            <br><br>

                            The side opposite the 90° angle is
                            always the <strong>hypotenuse</strong>.

                        </div>

                    </div>

                `

            },


            {
                title: "Why Do We Need Trigonometry?",

                content: `

                    <div class="learn-visual">

                        <h2>🏗️ Why Do We Need Trigonometry?</h2>

                        <p>
                            Sometimes we cannot directly measure
                            a height or distance.
                        </p>

                        <div class="info-box">

                            💡 If we know an angle and another
                            suitable measurement, trigonometry
                            can help us calculate an unknown
                            distance or height.

                        </div>

                        <div class="application-grid">

                            <div>🏗️ Construction</div>

                            <div>🛰️ Navigation</div>

                            <div>🌌 Astronomy</div>

                            <div>⚙️ Engineering</div>

                        </div>

                    </div>

                `

            },


            {
                title: "The 3–4–5 Triangle",

                content: `

                    <div class="learn-visual">

                        <h2>🧮 Example: 3–4–5 Triangle</h2>

                        <p>
                            Consider a right-angled triangle with
                            sides 3, 4 and 5.
                        </p>

                        <div class="calculation-box">

                            <strong>
                                Pythagoras Theorem
                            </strong>

                            <br><br>

                            a² + b² = c²

                            <br><br>

                            3² + 4² = 5²

                            <br>

                            9 + 16 = 25

                            <br><br>

                            ✅ 25 = 25

                        </div>

                    </div>

                `

            }

        ],


        // ====================================================
        // TOPIC 1 QUIZ
        // ====================================================

        quiz: [

            {
                question:
                    "What does trigonometry mainly study?",

                options: [
                    "Numbers and probability",
                    "Angles and sides of triangles",
                    "Only statistics",
                    "Only algebra"
                ],

                answer: 1

            },


            {
                question:
                    "Which is the longest side of a right-angled triangle?",

                options: [
                    "Adjacent",
                    "Opposite",
                    "Hypotenuse",
                    "Base"
                ],

                answer: 2

            },


            {
                question:
                    "A right angle is equal to:",

                options: [
                    "30°",
                    "45°",
                    "60°",
                    "90°"
                ],

                answer: 3

            },


            {
                question:
                    "In a 3–4–5 triangle, what is the hypotenuse?",

                options: [
                    "3",
                    "4",
                    "5",
                    "7"
                ],

                answer: 2

            },


            {
                question:
                    "Which field can use trigonometry?",

                options: [
                    "Construction",
                    "Navigation",
                    "Engineering",
                    "All of these"
                ],

                answer: 3

            }

        ]

    },


    // ========================================================
    // TOPIC 2
    // ========================================================

    2: {

        title: "Angles & Their Measurement",

        description:
            "Learn degrees, radians and angle measurement.",

        steps: [

            {
                title: "What is an Angle?",

                content: `

                    <div class="learn-visual">

                        <h2>📐 What is an Angle?</h2>

                        <p>
                            An angle is formed when two rays meet
                            at a common point.
                        </p>

                        <div class="info-box">

                            <strong>Vertex</strong>

                            <br>
                            The common point where the rays meet.

                            <br><br>

                            <strong>θ</strong>

                            <br>
                            Represents the angle.

                        </div>

                    </div>

                `

            },


            {
                title: "Types of Angles",

                content: `

                    <div class="learn-visual">

                        <h2>🔵 Types of Angles</h2>

                        <div class="angle-types-grid">

                            <div class="angle-type-card">

                                <strong>Acute</strong>

                                <span>
                                    Less than 90°
                                </span>

                            </div>


                            <div class="angle-type-card">

                                <strong>Right</strong>

                                <span>
                                    Exactly 90°
                                </span>

                            </div>


                            <div class="angle-type-card">

                                <strong>Obtuse</strong>

                                <span>
                                    Between 90° and 180°
                                </span>

                            </div>


                            <div class="angle-type-card">

                                <strong>Straight</strong>

                                <span>
                                    Exactly 180°
                                </span>

                            </div>

                        </div>

                    </div>

                `

            },


            {
                title: "Measuring Angles in Degrees",

                content: `

                    <div class="learn-visual">

                        <h2>🔵 Measuring Angles in Degrees</h2>

                        <p>
                            Degree is one of the most common units
                            used to measure angles.
                        </p>

                        <div class="info-box">

                            🔹 Complete rotation =
                            <strong>360°</strong>

                            <br><br>

                            🔹 Half rotation =
                            <strong>180°</strong>

                            <br><br>

                            🔹 Quarter rotation =
                            <strong>90°</strong>

                        </div>

                    </div>

                `

            },


            {
                title: "Understanding Radians",

                content: `

                    <div class="learn-visual">

                        <h2>🔄 Understanding Radians</h2>

                        <p>
                            Radian is another important unit
                            used to measure angles.
                        </p>

                        <div class="calculation-box">

                            Complete rotation:

                            <br><br>

                            <strong>
                                360° = 2π radians
                            </strong>

                            <br><br>

                            Therefore:

                            <br><br>

                            <strong>
                                180° = π radians
                            </strong>

                        </div>

                    </div>

                `

            },


            {
                title: "Degree to Radian Conversion",

                content: `

                    <div class="learn-visual">

                        <h2>🧮 Degree → Radian</h2>

                        <p>
                            To convert degrees into radians,
                            multiply the angle by
                            <strong>π/180</strong>.
                        </p>

                        <div class="calculation-box">

                            <strong>Example:</strong>

                            <br><br>

                            180° × π/180

                            <br><br>

                            = π radians

                        </div>

                        <div class="info-box">

                            📌 Formula:

                            <br><br>

                            <strong>
                                Radians =
                                Degrees × π/180
                            </strong>

                        </div>

                    </div>

                `

            },


            {
                title: "Important Angles",

                content: `

                    <div class="learn-visual">

                        <h2>⭐ Important Angles</h2>

                        <div class="important-angle-grid">

                            <div>
                                <strong>0°</strong>
                                <span>0</span>
                            </div>

                            <div>
                                <strong>30°</strong>
                                <span>π/6</span>
                            </div>

                            <div>
                                <strong>45°</strong>
                                <span>π/4</span>
                            </div>

                            <div>
                                <strong>60°</strong>
                                <span>π/3</span>
                            </div>

                            <div>
                                <strong>90°</strong>
                                <span>π/2</span>
                            </div>

                            <div>
                                <strong>180°</strong>
                                <span>π</span>
                            </div>

                        </div>

                    </div>

                `

            }

        ],


        // ====================================================
        // TOPIC 2 QUIZ
        // ====================================================

        quiz: [

            {
                question:
                    "How many degrees are in a complete rotation?",

                options: [
                    "90°",
                    "180°",
                    "270°",
                    "360°"
                ],

                answer: 3

            },


            {
                question:
                    "A right angle measures:",

                options: [
                    "45°",
                    "90°",
                    "180°",
                    "360°"
                ],

                answer: 1

            },


            {
                question:
                    "180° is equal to:",

                options: [
                    "π/2",
                    "π",
                    "2π",
                    "π/4"
                ],

                answer: 1

            },


            {
                question:
                    "360° is equal to:",

                options: [
                    "π",
                    "π/2",
                    "2π",
                    "4π"
                ],

                answer: 2

            },


            {
                question:
                    "Which is another unit used to measure angles?",

                options: [
                    "Meter",
                    "Kilogram",
                    "Radian",
                    "Second"
                ],

                answer: 2

            }

        ]

    }

};


// ============================================================
// OPEN TOPIC
// ============================================================

function openTopic(topicNumber) {

    topicNumber =
        Number(topicNumber);


    const topic =
        topics[topicNumber];


    if (!topic) {

        console.error(
            "Topic not found:",
            topicNumber
        );

        return;

    }


    if (!topic.steps || !topic.quiz) {

        showMessage(
            "📚 This topic's learning content is coming soon!"
        );

        return;

    }


    if (!isTopicUnlocked(topicNumber)) {

        showMessage(
            "🔒 Complete the previous topic first!"
        );

        return;

    }


    currentTopicNumber =
        topicNumber;


    currentStep = 0;

    currentQuizQuestion = 0;

    currentQuizScore = 0;


    showLearningPage();

}


// ============================================================
// TOPIC UNLOCK
// ============================================================

function isTopicUnlocked(topicNumber) {

    if (topicNumber === 1) {

        return true;

    }


    return trigProgress.completedTopics.includes(
        topicNumber - 1
    );

}


// ============================================================
// SHOW LEARNING PAGE
// ============================================================

function showLearningPage() {

    const topic =
        topics[currentTopicNumber];


    const step =
        topic.steps[currentStep];


    let oldPage =
        document.getElementById(
            "mathquest-learning-page"
        );


    if (oldPage) {

        oldPage.remove();

    }


    const page =
        document.createElement("div");


    page.id =
        "mathquest-learning-page";


    page.className =
        "learning-page";


    page.innerHTML = `

        <div class="learning-topbar">

            <button
                class="back-btn"
                id="backLearningBtn"
                type="button">

                ← Back to Trigonometry

            </button>


            <div class="step-counter">

                Step ${currentStep + 1}
                /
                ${topic.steps.length}

            </div>

        </div>


        <div class="learning-card">


            <div class="learning-progress">

                <div
                    class="learning-progress-fill"
                    style="
                        width:
                        ${
                            (
                                (
                                    currentStep + 1
                                )
                                /
                                topic.steps.length
                            ) * 100
                        }%;
                    ">
                </div>

            </div>


            <div class="learning-body">

                ${step.content}

            </div>


            <div class="learning-navigation">


                <button
                    class="learn-nav-btn"
                    id="previousStepBtn"
                    type="button"
                    ${
                        currentStep === 0
                        ? "disabled"
                        : ""
                    }>

                    ← Previous

                </button>


                <button
                    class="learn-nav-btn primary"
                    id="nextStepBtn"
                    type="button">

                    ${
                        currentStep ===
                        topic.steps.length - 1

                        ? "🎯 Start Quiz"

                        : "Next →"
                    }

                </button>


            </div>

        </div>

    `;


    document.body.appendChild(page);


    // ========================================================
    // EVENTS
    // ========================================================

    document
        .getElementById("backLearningBtn")
        .addEventListener(
            "click",
            backToTrigonometry
        );


    document
        .getElementById("previousStepBtn")
        .addEventListener(
            "click",
            previousStep
        );


    document
        .getElementById("nextStepBtn")
        .addEventListener(
            "click",
            nextStep
        );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// NEXT STEP
// ============================================================

function nextStep() {

    const topic =
        topics[currentTopicNumber];


    if (
        currentStep <
        topic.steps.length - 1
    ) {

        currentStep++;

        showLearningPage();

        return;

    }


    startTopicQuiz();

}


// ============================================================
// PREVIOUS STEP
// ============================================================

function previousStep() {

    if (currentStep <= 0) {

        return;

    }


    currentStep--;

    showLearningPage();

}


// ============================================================
// START QUIZ
// ============================================================

function startTopicQuiz() {

    currentQuizQuestion = 0;

    currentQuizScore = 0;

    showQuizPage();

}


// ============================================================
// SHOW QUIZ
// ============================================================

function showQuizPage() {

    const topic =
        topics[currentTopicNumber];


    const quiz =
        topic.quiz[currentQuizQuestion];


    const page =
        document.getElementById(
            "mathquest-learning-page"
        );


    if (!page) {

        return;

    }


    const progress =
        (
            (
                currentQuizQuestion + 1
            )
            /
            topic.quiz.length
        ) * 100;


    page.innerHTML = `

        <div class="learning-topbar">

            <button
                class="back-btn"
                id="backQuizBtn"
                type="button">

                ← Back to Lesson

            </button>


            <div class="step-counter">

                Quiz
                ${currentQuizQuestion + 1}
                /
                ${topic.quiz.length}

            </div>

        </div>


        <div class="quiz-card">


            <div class="quiz-progress">

                <div
                    class="quiz-progress-fill"
                    style="
                        width: ${progress}%;
                    ">
                </div>

            </div>


            <div class="quiz-header">

                <span>
                    🎯 Topic Quiz
                </span>

                <strong>
                    Question
                    ${currentQuizQuestion + 1}
                    / 5
                </strong>

            </div>


            <h2 class="quiz-question">

                ${quiz.question}

            </h2>


            <div class="quiz-options">

                ${quiz.options.map(
                    function (option, index) {

                        return `

                            <button
                                class="quiz-option"
                                data-answer="${index}"
                                type="button">

                                <span>

                                    ${
                                        String
                                        .fromCharCode(
                                            65 + index
                                        )
                                    }

                                </span>

                                ${option}

                            </button>

                        `;

                    }
                ).join("")}

            </div>


            <button
                class="quiz-next-btn"
                id="quizNextBtn"
                type="button"
                disabled>

                ${
                    currentQuizQuestion ===
                    topic.quiz.length - 1

                    ? "✓ Finish Quiz"

                    : "Next Question →"
                }

            </button>

        </div>

    `;


    let selectedAnswer = null;


    // ========================================================
    // SELECT ANSWER
    // ========================================================

    document
        .querySelectorAll(".quiz-option")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(
                                ".quiz-option"
                            )
                            .forEach(
                                function (btn) {

                                    btn.classList.remove(
                                        "selected"
                                    );

                                }
                            );


                        this.classList.add(
                            "selected"
                        );


                        selectedAnswer =
                            Number(
                                this.dataset.answer
                            );


                        document
                            .getElementById(
                                "quizNextBtn"
                            )
                            .disabled = false;

                    }
                );

            }
        );


    // ========================================================
    // NEXT QUESTION
    // ========================================================

    document
        .getElementById("quizNextBtn")
        .addEventListener(
            "click",
            function () {

                if (
                    selectedAnswer === null
                ) {

                    return;

                }


                if (
                    selectedAnswer ===
                    quiz.answer
                ) {

                    currentQuizScore++;

                }


                if (
                    currentQuizQuestion <
                    topic.quiz.length - 1
                ) {

                    currentQuizQuestion++;

                    showQuizPage();

                }

                else {

                    showQuizResult();

                }

            }
        );


    // ========================================================
    // BACK TO LESSON
    // ========================================================

    document
        .getElementById("backQuizBtn")
        .addEventListener(
            "click",
            function () {

                currentStep =
                    topic.steps.length - 1;

                showLearningPage();

            }
        );

}


// ============================================================
// QUIZ RESULT
// ============================================================

function showQuizResult() {

    const page =
        document.getElementById(
            "mathquest-learning-page"
        );


    const passed =
        currentQuizScore >= 3;


    const percentage =
        Math.round(
            (
                currentQuizScore /
                5
            ) * 100
        );


    page.innerHTML = `

        <div class="result-card">

            <div class="result-icon">

                ${
                    passed
                    ? "🎉"
                    : "📚"
                }

            </div>


            <h1>

                ${
                    passed
                    ? "Topic Complete!"
                    : "Keep Practicing!"
                }

            </h1>


            <p class="result-message">

                ${
                    passed

                    ? "Excellent! You successfully completed this topic."

                    : "You need at least 3 correct answers to pass."
                }

            </p>


            <div class="score-circle">

                <strong>
                    ${currentQuizScore}/5
                </strong>

                <span>
                    ${percentage}%
                </span>

            </div>


            ${
                passed

                ? `

                    <div class="xp-earned">

                        ⭐ +10 XP

                    </div>


                    <button
                        class="result-btn primary"
                        id="completeTopicBtn"
                        type="button">

                        ✓ Complete Topic

                    </button>

                `

                : `

                    <button
                        class="result-btn primary"
                        id="retryQuizBtn"
                        type="button">

                        🔄 Try Quiz Again

                    </button>

                `
            }


            <button
                class="result-btn"
                id="resultBackBtn"
                type="button">

                ← Back to Trigonometry

            </button>

        </div>

    `;


    // ========================================================
    // PASSED
    // ========================================================

    if (passed) {

        document
            .getElementById(
                "completeTopicBtn"
            )
            .addEventListener(
                "click",
                function () {

                    completeTopic(
                        currentTopicNumber
                    );

                    backToTrigonometry();

                }
            );

    }


    // ========================================================
    // FAILED
    // ========================================================

    else {

        document
            .getElementById(
                "retryQuizBtn"
            )
            .addEventListener(
                "click",
                function () {

                    startTopicQuiz();

                }
            );

    }


    // ========================================================
    // BACK
    // ========================================================

    document
        .getElementById(
            "resultBackBtn"
        )
        .addEventListener(
            "click",
            backToTrigonometry
        );

}


// ============================================================
// COMPLETE TOPIC
// ============================================================

function completeTopic(
    topicNumber
) {

    if (
        trigProgress.completedTopics.includes(
            topicNumber
        )
    ) {

        return;

    }


    trigProgress.completedTopics.push(
        topicNumber
    );


    trigProgress.xp += 10;


    trigProgress.currentTopic =
        topicNumber + 1;


    saveTrigProgress();

}


// ============================================================
// BACK TO TRIGONOMETRY PAGE
// ============================================================

function backToTrigonometry() {

    const learningPage =
        document.getElementById(
            "mathquest-learning-page"
        );


    if (learningPage) {

        learningPage.remove();

    }


    // Main HTML page wapas visible rahega
    document.body.style.overflow = "";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateChapterCards();

}


// ============================================================
// UPDATE STATIC HTML CARDS
// ============================================================

function updateChapterCards() {

    const topicCards =
        document.querySelectorAll(
            ".topic-card"
        );


    topicCards.forEach(
        function (card) {

            const topicNumber =
                Number(
                    card.dataset.topic
                );


            if (!topicNumber) {

                return;

            }


            if (
                trigProgress.completedTopics.includes(
                    topicNumber
                )
            ) {

                card.classList.add(
                    "completed"
                );

            }

        }
    );


    const xp =
        document.getElementById(
            "xpValue"
        );


    if (xp) {

        xp.textContent =
            trigProgress.xp + " XP";

    }

}


// ============================================================
// SAVE PROGRESS
// ============================================================

function saveTrigProgress() {

    localStorage.setItem(

        "mathquest_trigonometry_progress",

        JSON.stringify(
            trigProgress
        )

    );

}


// ============================================================
// LOAD PROGRESS
// ============================================================

function loadTrigProgress() {

    const saved =
        localStorage.getItem(
            "mathquest_trigonometry_progress"
        );


    if (!saved) {

        return;

    }


    try {

        const parsed =
            JSON.parse(saved);


        if (parsed) {

            trigProgress =
                parsed;

        }

    }

    catch (error) {

        console.error(
            "Progress load error:",
            error
        );

    }

}


// ============================================================
// MESSAGE
// ============================================================

function showMessage(
    message
) {

    alert(message);

}


// ============================================================
// INITIALIZE
// ============================================================
// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTrigProgress();

        updateChapterCards();

        // ====================================================
        // BACK TO CHAPTERS BUTTON
        // ====================================================

        const goBackBtn =
            document.getElementById(
                "goBackToChaptersBtn"
            );

        if (goBackBtn) {

            goBackBtn.addEventListener(
                "click",
                function () {

                    console.log(
                        "Back to Chapters clicked — direct to Subjects"
                    );

                    const learningPage =
                        document.getElementById(
                            "mathquest-learning-page"
                        );

                    if (learningPage) {

                        learningPage.remove();

                    }

                    document.body.style.overflow = "";

                    // FIX: return to dashboard SPA instead of standalone subjects (prevents sidebar freeze)
                    sessionStorage.setItem('returnSection','subjects');
                    var target = '../../dashboard.html';
                    var abs = window.location.origin && window.location.origin !== 'null' ? window.location.origin + '/dashboard.html' : target;
                    window.location.href = window.location.protocol === 'file:' ? target : abs;

                }
            );

        }

        console.log(
            "MathQuest Trigonometry loaded successfully."
        );

    }
);