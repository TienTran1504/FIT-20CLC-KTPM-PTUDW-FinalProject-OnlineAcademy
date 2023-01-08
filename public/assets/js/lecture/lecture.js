$(document).ready(function () {
  var ratings = parseFloat($("#number_rating")[0].innerText) || 0;

  var starTotal = 5;
  var starPercentage = (ratings / starTotal) * 100;
  var star = starPercentage + "%";
  $(".stars-inner").width(star);
});
