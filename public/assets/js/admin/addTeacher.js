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
        inputFirstName.style.borderColor = "red";
        inputFirstName.select();
        e.preventDefault();
        return;
    }
    if (inputLastName.value.length === 0) {
        messageLastName.style.display = "block";
        inputLastName.style.borderColor = "red";
        inputLastName.select();
        e.preventDefault();
        return;
    }

    if (inputEmail.value.length === 0) {
        alert("Please fill out your Email");
        messageEmail.style.display = "block";
        inputEmail.style.borderColor = "red";
        inputEmail.select();
        e.preventDefault();
        return;
    }
    if (inputPassword.value.length === 0) {
        alert("Please fill out your Password");
        messagePassword.style.display = "block";
        inputPassword.style.borderColor = "red";
        inputPassword.select();
        e.preventDefault();
        return;
    }
    if (inputPassword.value.length < 6) {
        alert("Password must be more than 6 characters");
        messagePassword.style.display = "block";
        inputPassword.style.borderColor = "red";
        inputPassword.select();
        e.preventDefault();
        return;
    }
    if (!filter.test(inputEmail.value)) {
        alert("Please fill out a valid email format");
        messageEmail.style.display = "block";
        inputEmail.style.borderColor = "red";
        inputEmail.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-add").addEventListener("click", handleSubmit);