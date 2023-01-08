$(document).ready(function () {
  $("#password").keyup(function () {
    $("#strengthMessage").html(checkStrength($("#password").val()));
  });
  function checkStrength(password) {
    var strength = 0;
    if (password.length < 6) {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("Short");
      return "Please input at least 6 length";
    }
  }
});
