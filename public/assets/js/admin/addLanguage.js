const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputLanguage = $("#txtLanguageName");
    const inputLanguageImage = $("#txtLanguageImage");

    const messageLanguageName = $("#languageName");
    const messageImageLink = $("#languageImageLink");

    messageLanguageName.style.display = "none";
    messageImageLink.style.display = "none";
    inputLanguage.style.borderColor = "#ced4da";
    inputLanguageImage.style.borderColor = "#ced4da";
    if (inputLanguage.value.length === 0) {
        messageLanguageName.style.display = "block";
        inputLanguage.style.borderColor = "red";
        inputLanguage.select();
        e.preventDefault();
        return;
    }
    if (inputLanguageImage.value.length === 0) {
        messageImageLink.style.display = "block";
        inputLanguageImage.style.borderColor = "red";
        inputLanguageImage.select();
        e.preventDefault();
        return;
    }
    alert("Thank you for your information!");
}
$(".btn-add").addEventListener("click", handleSubmit);