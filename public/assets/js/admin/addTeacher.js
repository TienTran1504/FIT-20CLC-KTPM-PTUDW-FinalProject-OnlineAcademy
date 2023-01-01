const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const inputFirstName = $("#txtTeacherFirstName");
    const inputLastName = $("#txtTeacherLastName");
    const inputEmail = $("#txtTeacherEmail");
    const inputPassword = $("#txtTeacherPassword");
    if (inputFirstName.value.length === 0) {
        alert("Please fill out your first name");
        inputFirstName.select();
        e.preventDefault();
        return;
    }
    if (inputLastName.value.length === 0) {
        alert("Please fill out your Last name");
        inputLastName.select();
        e.preventDefault();
        return;
    }

    if (inputEmail.value.length === 0) {
        alert("Please fill out your Email");
        inputEmail.select();
        e.preventDefault();
        return;
    }
    if (inputPassword.value.length === 0) {
        alert("Please fill out your Password");
        inputPassword.select();
        e.preventDefault();
        return;
    }
    if (inputPassword.value.length < 6) {
        alert("Password must be more than 6 characters");
        inputPassword.select();
        e.preventDefault();
        return;
    }
    if (!filter.test(inputEmail.value)) {
        alert("Please fill out a valid email format");
        inputEmail.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-add").addEventListener("click", handleSubmit);