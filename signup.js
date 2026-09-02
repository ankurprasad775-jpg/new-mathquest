// =========================================
// MATHQUEST SIGNUP
// =========================================

const signupForm =
    document.getElementById(
        "signupForm"
    );


signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "signupName"
            ).value.trim();


        const email =
            document.getElementById(
                "signupEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "signupPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        // =================================
        // CHECK PASSWORD
        // =================================

        if (
            password !==
            confirmPassword
        ) {

            alert(
                "Passwords do not match!"
            );

            return;

        }


        // =================================
        // GET EXISTING USERS
        // =================================

        const users =
            JSON.parse(
                localStorage.getItem(
                "mathQuestUsers"
                )
            ) || [];


        // =================================
        // CHECK EMAIL
        // =================================

        const existingUser =
            users.find(
                function (user) {

                    return (
                        user.email ===
                        email
                    );

                }
            );


        if (existingUser) {

            alert(
                "An account with this email already exists!"
            );

            return;

        }


        // =================================
        // CREATE USER
        // =================================

        const newUser = {

            id:
                Date.now().toString(),

            name:
                name,

            email:
                email,

            password:
                password,

            xp:
                0,

            streak:
                0,

            hearts:
                5,

            completedLessons:
                [],

            unlockedLessons: {

                algebra: [0],

                trigonometry: [0]

            },

            lastStudyDate:
                null

        };


        // =================================
        // SAVE USER
        // =================================

        users.push(
            newUser
        );


        localStorage.setItem(

            "mathQuestUsers",

            JSON.stringify(
                users
            )

        );


        // =================================
        // SUCCESS
        // =================================

        alert(
            "Account created successfully! 🎉"
        );


        // Go to login

        window.location.href =
            "login.html";

    }
);


// =========================================
// SHOW / HIDE PASSWORD
// =========================================

const togglePassword =
    document.getElementById(
        "togglePassword"
    );


const passwordInput =
    document.getElementById(
        "signupPassword"
    );


togglePassword.addEventListener(
    "click",
    function () {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            togglePassword.textContent =
                "🙈";

        }
        else {

            passwordInput.type =
                "password";

            togglePassword.textContent =
                "👁";

        }

    }
);
