$(document).ready(function () {
  $("#password").keyup(function () {
    $("#strengthMessage").html(
      checkPassword($("#password").val(), $("#strengthMessage"))
    );
  });
  $("#password1").keyup(function () {
    $("#strengthMessage1").html(
      checkPassword($("#password1").val(), $("#strengthMessage1"))
    );
  });
  $("#email").keyup(function () {
    $("#strengthMessage2").html(checkEmail($("#email").val()));
  });
  $("#lastname").keyup(function () {
    $("#strengthMessage3").html(
      checkName($("#lastname").val(), $("#strengthMessage3"))
    );
  });
  $("#firstname").keyup(function () {
    $("#strengthMessage4").html(
      checkName($("#firstname").val(), $("#strengthMessage4"))
    );
  });

  function checkPassword(password, selector) {
    if (password.length < 1) {
      selector.removeClass();
      selector.addClass("Short");
      return "Input cannot be empty";
    } else {
      selector.removeClass();
      selector.addClass("");
      return "";
    }
  }
  function checkEmail(email) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      $("#strengthMessage2").removeClass();
      $("#strengthMessage2").addClass("Short");
      return "Invalid email";
    } else {
      $("#strengthMessage2").removeClass();
      $("#strengthMessage2").addClass("");
      return "";
    }
  }
  function checkName(lastname, selector) {
    if (lastname.length < 1) {
      selector.removeClass();
      selector.addClass("Short");
      return "Input cannot be empty";
    } else {
      selector.removeClass();
      selector.addClass("");
      return "";
    }
  }

  $("#form-profile").submit(function (e) {
    const valuePass = $("#password").val();
    const valuePass1 = $("#password1").val();
    const valueEmail = $("#email").val();
    const valueLastName = $("#lastname").val();
    const valueFirstName = $("#firstname").val();
    if (valueEmail.length < 1) {
      if (valuePass.length < 1) {
        e.preventDefault();
        return;
      }
    } else if (
      valuePass1.length < 1 ||
      valueLastName.length < 1 ||
      valueFirstName.length < 1
    ) {
      $("#strengthMessage1").html(
        checkPassword(valuePass1, $("#strengthMessage1"))
      );
      $("#strengthMessage3").html(
        checkName(valueLastName, $("#strengthMessage3"))
      );
      $("#strengthMessage4").html(
        checkName(valueFirstName, $("#strengthMessage4"))
      );
      e.preventDefault();
      return;
    }
  });

  $("#form-profile-2").submit(function (e) {
    const valuePass = $("#password").val();
    const valueEmail = $("#email").val();
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valueEmail) ||
      valuePass.length < 1
    ) {
      $("#strengthMessage").html(
        checkPassword($("#password").val(), $("#strengthMessage"))
      );
      $("#strengthMessage2").html(checkEmail($("#email").val()));
      e.preventDefault();
      return;
    }
  });
});
