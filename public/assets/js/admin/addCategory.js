const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputCategoryName = $("#txtCategoryName");
    const inputImageLink = $("#txtCategoryImage");
    const messageCategoryName = $("#categoryName");
    const messageImageLink = $("#linkImage");

    inputCategoryName.style.borderColor = "#ced4da";
    inputImageLink.style.borderColor = "#ced4da";
    messageCategoryName.style.display = "none";
    messageImageLink.style.display = "none";

    if (inputCategoryName.value.length === 0) {
        messageCategoryName.style.display = "block";
        inputCategoryName.style.borderColor = "red";
        inputCategoryName.select();
        e.preventDefault();
        return;
    }
    if (inputImageLink.value.length === 0) {
        messageImageLink.style.display = "block";
        inputImageLink.style.borderColor = "red";
        inputImageLink.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-add").addEventListener("click", handleSubmit);