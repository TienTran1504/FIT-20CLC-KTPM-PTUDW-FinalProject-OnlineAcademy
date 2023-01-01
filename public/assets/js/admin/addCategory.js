const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputFirstName = $("#txtCategoryName");
    const inputLastName = $("#txtCategoryImage");
    if (inputFirstName.value.length === 0) {
        alert("Please fill out Category's name");
        inputFirstName.select();
        e.preventDefault();
        return;
    }
    if (inputLastName.value.length === 0) {
        alert("Please fill out Category's image");
        inputLastName.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-add").addEventListener("click", handleSubmit);