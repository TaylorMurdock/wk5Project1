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
      $(this).addClass("highlight");
    } else {
      $(".alerts").removeClass("open");
      $(this).removeClass("highlight");
    }
  });
});

const currentWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35.5951&lon=82.5515&appid=20c52dcce61a134a5c6deb567556e70c";

fetch(currentWeatherUrl)
  .then((response) => {
    // console.log(response.json());
    return response.json();
  })
  .then((data) => {
    console.log(data.main);

    const content = $(".content");
    // console.log(content);
  });
