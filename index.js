$(document).ready(function () {
  var alertsOpen = false;
  var lastClickedTab = null;

  $(".tabs button").click(function () {
    if (lastClickedTab) {
      lastClickedTab.removeClass("highlight");
    }

    $(this).addClass("highlight");

    lastClickedTab = $(this);
  });

  $("#alertButton").click(function () {
    alertsOpen = !alertsOpen;

    if (alertsOpen) {
      $(".alerts").addClass("open");
    } else {
      $(".alerts").removeClass("open");
    }
  });
});
