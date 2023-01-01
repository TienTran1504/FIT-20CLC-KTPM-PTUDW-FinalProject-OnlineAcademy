const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputLanguage = $("#txtLanguageName");
    const inputLanguageImage = $("#txtLanguageImage");
    if (inputLanguage.value.length === 0) {
        alert("Please fill out Language's name");
        inputLanguage.select();
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
$(".btn-add").addEventListener("click", handleSubmit);