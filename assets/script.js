$(document).ready(function () {
  const { value: username } = Swal.fire({
    title: "Enter a Username",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
      var greeting = $("#greeting");
      var greet1 = "<p>" + "Hello, " + `${value}` + "</p>";
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
  var data = document.querySelector(".caloriesIntake");
  if (isNaN(data.value)) {
    //checks for non numerical values and rejects them
    alert("Please enter a valid number");
  } else {
    console.log(data.value);
  }
  // adding up calories
  totalCalories += parseInt(data.value);
  localStorage.setItem("totalCalories", totalCalories);
  data.value = "";
  var totalCaloriesEl = document.querySelector("#total-calories");
  totalCaloriesEl.textContent = "Total weekly calories: " + totalCalories;
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
  totalCaloriesEl.textContent = "Total weekly calories:" + totalCalories;
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
      response.forEach((e) => {
        var templateString =
          '<article class="card"><h2>' +
          e.name +
          "</h2><p>" +
          "Instructions: " +
          e.instructions +
          "</p><p>" +
          "Muscle Group: " +
          e.muscle +
          "</p><p>" +
          "Equipment: " +
          e.equipment +
          "</p></article>";
        $("#output").append(templateString);
        //var activityname = e.name;
        //var instructions = e.instructions;
        //var instructionsEl = $('<p>');
        //instructionsEl.text("Instructions: " + instructions);
        //finaloutput.text("Name: " + activityname);
        //finaloutput.append(instructionsEl);
      });
    })
    .catch((err) => console.error(err));
}
searchbtn.on("click", (event) => {
  event.preventDefault();
  $("#output").empty();
  input();
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
