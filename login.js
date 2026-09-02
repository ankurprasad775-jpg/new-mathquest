// =========================================
// MATHQUEST LOGIN
// =========================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        // Get users

        const users =
            JSON.parse(
                localStorage.getItem(
                    "mathQuestUsers"
                )
            ) || [];


        // Find user

        const foundUser =
            users.find(
                function (user) {

                    return (

                        user.email ===
                        email &&

                        user.password ===
                        password

                    );

                }
            );


        // User not found

        if (!foundUser) {

            alert(
                "Invalid email or password!"
            );

            return;

        }


        // Save current user

        localStorage.setItem(

            "mathQuestCurrentUser",

            JSON.stringify(
                foundUser
            )

        );


        // Open MathQuest

        window.location.href =
            "index.html";

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
        "loginPassword"
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
