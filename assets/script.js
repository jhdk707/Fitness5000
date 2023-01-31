var displayexerciseid = 0;
var back = $("#back");
var next = $("#next");
var ebuttons = $("#numberbutton");

$(document).ready(function () {
  const { value: username } = Swal.fire({
    title: "Enter a Username",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
      var greeting = $("#greeting");
      var greet1 = "<h4>" + "Hello, " + `${value}` + "</h4>";
      greeting.append(greet1);
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Timer function to present local date and time in header
  const currentDay = document.querySelector(".currentDay");
  setInterval(() => {
    let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
    currentDay.innerHTML = time;
  }, 1000);
});

$(function () {
  $("#input").selectmenu();
});
var salert = $("#alert");
finaloutput = "";
salert.on("click", function () {
  Swal.fire("Welcome!");
});

var totalCalories = 0;
function sConsole(event) {
  event.preventDefault();
  var data = document.querySelector("input[name='caloriesIntake']");
  if (isNaN(data.value)) {
    //checks for non numerical values and rejects them
    var modal = document.querySelector(".modal");
    modal.classList.add("is-active");
  } else {
    console.log(data.value);
  }
  var closeButton = document.querySelector(".delete");
  var okButton = document.querySelector(".modal-card-foot .button");

  closeButton.addEventListener("click", function () {
    modal.classList.remove("is-active");
  });

  okButton.addEventListener("click", function () {
    modal.classList.remove("is-active");
  });
  // adding up calories
  totalCalories += parseInt(data.value);
  localStorage.setItem("totalCalories", totalCalories);
  data.value = "";
  var totalCaloriesEl = document.querySelector("#total-calories");
  totalCaloriesEl.textContent = "Total daily calories: " + totalCalories;
}
function updateTotalCalories() {
  var totalCaloriesEl = document.querySelector("#total-calories");
  var total;
  // getting exsiting calories
  var existingTotalCalories = localStorage.getItem("totalCalories");
  // checking existing total calories
  if (existingTotalCalories == null) {
    existingTotalCalories = 0;
  }
  // adding to existing total
  var totalCalories = parseInt(existingTotalCalories) + parseInt(data.value);
  // storing new total
  localStorage.setItem("totalCalories", totalCalories);
  // updating total calories on HTML
  var totalCaloriesEl = document.querySelector("total-calories");
  totalCaloriesEl.textContent = "Total Daily calories:" + totalCalories;
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    sConsole(event);
    updateTotalCalories();
  });
}
var searchbtn = $("#searchbutton");
let activityinput = "";
var finaloutput = $("#output");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "396d65978cmsh536e29951248595p199c25jsn69e49935a220",
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
  },
};
fetch(
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?type=cardio",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
function input() {
  var activityinput = $("#searchinput").val();
  fetch(
    "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?type=" +
      activityinput,
    options
  ) //"&muscle=" + muscleinput
    .then((response) => response.json())
    .then(function (response) {
      for (var i = 0; i < 10; i++) {
        var templateString =
          '<article class="card is-hidden" id="exercise-' +
          i +
          '"><h2>' +
          response[i].name +
          "</h2><h3>" +
          "Instructions: " +
          response[i].instructions +
          "</h3><p>" +
          "Muscle Group: " +
          response[i].muscle +
          "</p><p>" +
          "Equipment: " +
          response[i].equipment +
          "</p></article>";
        $("#output").append(templateString);
        $("#exercise-0").removeClass("is-hidden");
      }
    });
}
searchbtn.on("click", (event) => {
  $("#back").removeClass("is-hidden");
  $("#next").removeClass("is-hidden");
  event.preventDefault();
  $("#output").empty();
  input();
});

next.on("click", (event) => {
  event.preventDefault();
  $("#exercise-" + displayexerciseid).addClass("is-hidden");
  displayexerciseid++;
  if (displayexerciseid === 10) {
    displayexerciseid = 0;
  }
  $("#exercise-" + displayexerciseid).removeClass("is-hidden");
});
back.on("click", (event) => {
  event.preventDefault();
  $("#exercise-" + displayexerciseid).addClass("is-hidden");
  if (displayexerciseid === 0) {
    displayexerciseid = 10;
  }
  displayexerciseid--;
  $("#exercise-" + displayexerciseid).removeClass("is-hidden");
});

document
  .getElementById("fetch-data-button")
  .addEventListener("click", async function () {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const data = await fetchData(weight, height);
    console.log(data);
    data.forEach((e) => {
      var templateStringBMI =
        '<article class="card1">' <
        p >
        "BMI: " +
          e.bmi +
          "</p><p>" +
          "Health: " +
          e.health +
          "</p><p>" +
          "Healthy BMI Range: " +
          e.healthy_bmi_range +
          "</p></article>";
      $("#output").append(templateStringBMI);
    });
  });
async function fetchData(weight, height) {
  const url = `${API_URL}bmi?weight=${weight}&height=${height}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
