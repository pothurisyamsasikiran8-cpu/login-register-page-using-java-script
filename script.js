const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name =
            document.getElementById("name").value.trim();

        let email =
            document.getElementById("email").value.trim();

        let mobile =
            document.getElementById("mobile").value.trim();

        let password =
            document.getElementById("password").value;

        let confirmPassword =
            document.getElementById("confirmPassword").value;

        let message =
            document.getElementById("message");
        if (
            name === "" ||
            email === "" ||
            mobile === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            message.innerText =
                "Please fill all fields";

            return;
        }
        if (password.length < 6) {

            message.innerText =
                "Password must contain at least 6 characters";

            return;
        }
        if (password !== confirmPassword) {

            message.innerText =
                "Passwords do not match";

            return;
        }
        let emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.innerText =
                "Enter a valid email";

            return;
        }

        let mobilePattern =
            /^[0-9]{10}$/;

        if (!mobilePattern.test(mobile)) {

            message.innerText =
                "Enter a valid 10-digit mobile number";

            return;
        }

        let user = {

            name: name,

            email: email,

            mobile: mobile,

            password: password
        };
        let userJSON =
            JSON.stringify(user);

        console.log("User JSON:");
        console.log(userJSON);
        localStorage.setItem(
            "registeredUser",
            userJSON
        );
        message.innerText =
            "Registration successful!";

        registerForm.reset();

    });
}
const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {
            event.preventDefault();
            let email =
                document.getElementById("loginEmail")
                    .value
                    .trim();

            let password =
                document.getElementById("loginPassword")
                    .value;

            let loginMessage =
                document.getElementById("loginMessage");
            let storedUser =
                localStorage.getItem(
                    "registeredUser"
                );
            if (storedUser === null) {

                loginMessage.innerText =
                    "No registered user found";

                return;
            }
            try {

                let user =
                    JSON.parse(storedUser);
                if (
                    email === user.email &&
                    password === user.password
                ) {

                    loginMessage.innerText =
                        "Login successful";
                    sessionStorage.setItem(
                        "loggedInUser",
                        user.name
                    );
                    setTimeout(function() {

                        window.location.href =
                            "index.html";

                    }, 1000);

                }

                else {

                    loginMessage.innerText =
                        "Invalid email or password";
                }

            }

            catch (error) {

                console.log(
                    "Invalid user data"
                );

                loginMessage.innerText =
                    "Invalid stored user data";
            }

        }
    );
}
let loggedInUser =
    sessionStorage.getItem(
        "loggedInUser"
    );

let welcomeElement =
    document.getElementById("welcome");

if (
    loggedInUser &&
    welcomeElement
) {

    welcomeElement.innerText =
        "Welcome " + loggedInUser;
}
function logout() {

    sessionStorage.removeItem(
        "loggedInUser"
    );

    alert(
        "Logged out successfully"
    );

    window.location.href =
        "login.html";
}