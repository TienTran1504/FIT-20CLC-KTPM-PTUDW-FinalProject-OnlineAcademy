const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputCategoryName = $("#txtCategoryName");
    const inputCategoryImage = $("#txtCategoryImage");
    console.log(inputCategoryName);
    console.log(inputCategoryImage);
    if (inputCategoryName.value.length === 0) {
        alert("Please fill out Category's name");
        inputCategoryName.select();
        e.preventDefault();
        return;
    }
    if (inputCategoryImage.value.length === 0) {
        alert("Please fill out Category's image");
        inputCategoryImage.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-save").addEventListener("click", handleSubmit);