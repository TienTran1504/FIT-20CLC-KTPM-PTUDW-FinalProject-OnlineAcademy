$(document).ready(function () {
  var ratings = parseInt($("#number_rating")[0].innerText) || 0;
  var starTotal = 5;
  var starPercentage = (ratings / starTotal) * 100;
  var star = starPercentage + "%";
  $(".stars-inner").width(star);
});

$(document).ready(function () {
  $("topic-lecture").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
});
