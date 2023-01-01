const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputLanguageName = $("#txtLanguageName");
    const inputLanguageImage = $("#txtLanguageImage");
    if (inputLanguageName.value.length === 0) {
        alert("Please fill out Language's name");
        inputLanguageName.select();
        e.preventDefault();
        return;
    }
    if (inputLanguageImage.value.length === 0) {
        alert("Please fill out Language's image");
        inputLanguageImage.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-save").addEventListener("click", handleSubmit);