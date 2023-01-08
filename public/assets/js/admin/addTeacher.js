const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const inputFirstName = $("#txtTeacherFirstName");
    const inputLastName = $("#txtTeacherLastName");
    const inputEmail = $("#txtTeacherEmail");
    const inputPassword = $("#txtTeacherPassword");
    const messageFirstName = $("#firstName");
    const messageLastName = $("#lastName");
    const messageEmail = $("#email");
    const messagePassword = $("#password");

    const messageFirstNameText = $("#firstNameText");
    const messageLastNameText = $("#lastNameText");
    const messageEmailText = $("#emailText");
    const messagePasswordText = $("#passwordText");

    inputFirstName.style.borderColor = "#ced4da";
    inputLastName.style.borderColor = "#ced4da";
    inputEmail.style.borderColor = "#ced4da";
    inputPassword.style.borderColor = "#ced4da";
    messageFirstName.style.display = "none";
    messageLastName.style.display = "none";
    messageEmail.style.display = "none";
    messagePassword.style.display = "none";
    if (inputFirstName.value.length === 0) {
        messageFirstName.style.display = "block";
        messageFirstNameText.innerText = "Please fill out first name";
        inputFirstName.style.borderColor = "red";
        inputFirstName.select();
        e.preventDefault();
        return;
    }
    if (inputLastName.value.length === 0) {
        messageLastName.style.display = "block";
        messageLastNameText.innerText = "Please fill out last name";
        inputLastName.style.borderColor = "red";
        inputLastName.select();
        e.preventDefault();
        return;
    }

    if (inputEmail.value.length === 0) {
        messageEmail.style.display = "block";
        messageEmailText.innerText = "Please fill out your email";
        inputEmail.style.borderColor = "red";
        inputEmail.select();
        e.preventDefault();
        return;
    }
    if (!filter.test(inputEmail.value)) {
        messageEmail.style.display = "block";
        messageEmailText.innerText = "Please fill out a valid email";
        inputEmail.style.borderColor = "red";
        inputEmail.select();
        e.preventDefault();
        return;
    }
    if (inputPassword.value.length === 0) {
        messagePassword.style.display = "block";
        messagePasswordText.innerText = "Please fill out your password"
        inputPassword.style.borderColor = "red";
        inputPassword.select();
        e.preventDefault();
        return;
    }
    if (inputPassword.value.length < 6) {
        messagePassword.style.display = "block";
        messagePasswordText.innerText = "Password must be more than 6 characters"
        inputPassword.style.borderColor = "red";
        inputPassword.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-add").addEventListener("click", handleSubmit);