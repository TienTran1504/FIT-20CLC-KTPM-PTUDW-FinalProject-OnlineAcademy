$(document).ready(function () {
  $("#password").keyup(function () {
    $("#strengthMessage").html(checkStrength($("#password").val()));
  });
  $("#password1").keyup(function () {
    $("#strengthMessage1").html(checkStrength1($("#password1").val()));
  });
  $("#email").keyup(function () {
    $("#strengthMessage2").html(checkStrength2($("#email").val()));
  });
  $("#lastname").keyup(function () {
    $("#strengthMessage3").html(checkStrength3($("#lastname").val()));
  });
  $("#firstname").keyup(function () {
    $("#strengthMessage4").html(checkStrength4($("#firstname").val()));
  });
  function checkStrength(password) {
    if (password.length < 1) {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("Short");
      return "Input cannot be blank";
    } else {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("");
      return "";
    }
  }
  function checkStrength1(password) {
    if (password.length < 1) {
      $("#strengthMessage1").removeClass();
      $("#strengthMessage1").addClass("Short");
      return "Input cannot be blank";
    } else {
      $("#strengthMessage1").removeClass();
      $("#strengthMessage1").addClass("");
      return "";
    }
  }
  function checkStrength2(password) {
    if (password.length < 1) {
      $("#strengthMessage2").removeClass();
      $("#strengthMessage2").addClass("Short");
      return "Input cannot be blank";
    } else {
      $("#strengthMessage2").removeClass();
      $("#strengthMessage2").addClass("");
      return "";
    }
  }
  function checkStrength3(password) {
    if (password.length < 1) {
      $("#strengthMessage3").removeClass();
      $("#strengthMessage3").addClass("Short");
      return "Input cannot be blank";
    } else {
      $("#strengthMessage3").removeClass();
      $("#strengthMessage3").addClass("");
      return "";
    }
  }
  function checkStrength4(password) {
    if (password.length < 1) {
      $("#strengthMessage4").removeClass();
      $("#strengthMessage4").addClass("Short");
      return "Input cannot be blank";
    } else {
      $("#strengthMessage4").removeClass();
      $("#strengthMessage4").addClass("");
      return "";
    }
  }
});
