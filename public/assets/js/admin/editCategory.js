const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputCategoryName = $("#txtCategoryName");
    const inputCategoryImage = $("#txtCategoryImage");
    const messageCategoryName = $("#CategoryName");
    const messageImageLink = $("#CategoryImage");

    inputCategoryName.style.borderColor = "#ced4da";
    inputCategoryImage.style.borderColor = "#ced4da";
    messageCategoryName.style.display = "none";
    messageImageLink.style.display = "none";
    if (inputCategoryName.value.length === 0) {
        messageCategoryName.style.display = "block";
        inputCategoryName.style.borderColor = "red";
        inputCategoryName.select();
        e.preventDefault();
        return;
    }
    if (inputCategoryImage.value.length === 0) {
        messageImageLink.style.display = "block";
        inputCategoryImage.style.borderColor = "red";
        inputCategoryImage.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-save").addEventListener("click", handleSubmit);