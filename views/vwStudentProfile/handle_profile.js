var listActionElement = document.querySelectorAll(".list-group-item");

listActionElement.forEach((value, index) => {
  value.addEventListener("click", () => {
    var current = document.getElementsByClassName("active");
    console.log(current.className);
  });
  if (value.classList[2] === "active") {
    value.style.backgroundColor = "#52ab98";
  } else {
    value.style.backgroundColor = "#ffffff";
  }
});
