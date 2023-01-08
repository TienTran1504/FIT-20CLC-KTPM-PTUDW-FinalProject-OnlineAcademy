const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function handleSubmit(e) {
    const inputLanguageName = $("#txtLanguageName");
    const inputLanguageImage = $("#txtLanguageImage");
    const messageLanguageName = $("#LanguageName");
    const messageImageLink = $("#LanguageImage");

    inputLanguageName.style.borderColor = "#ced4da";
    inputLanguageImage.style.borderColor = "#ced4da";
    messageLanguageName.style.display = "none";
    messageImageLink.style.display = "none";
    if (inputLanguageName.value.length === 0) {
        messageLanguageName.style.display = "block";
        inputLanguageName.style.borderColor = "red";
        inputLanguageName.select();
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
$(".btn-save").addEventListener("click", handleSubmit);