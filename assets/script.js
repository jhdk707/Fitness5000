var displayexerciseid = 0;
var back = $("#back");
var next = $("#next");
var ebuttons = $("#numberbutton");
var weight;
var height;

// Welcome Modal with Name Input
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

// Timer function to present local date and time in header, loads on ready
document.addEventListener("DOMContentLoaded", function () {
  const currentDay = document.querySelector(".currentDay");
  setInterval(() => {
    let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
    currentDay.innerHTML = time;
  }, 1000);
});

// Calorie Counter Function
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
  )
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

// BMI Calculator in footer
document
  .getElementById("fetch-data-button")
  .addEventListener("click", async function () {
    $("#outputBmi").empty();
    var weightKG = document.getElementById("weight").value;
    var heightFT = document.getElementById("heightft").value;
    var heightCM = document.getElementById("inches").value;
    var weight = parseInt(weightKG) / 2.205;
    var height = parseInt(heightCM) * 2.54 + parseInt(heightFT) * 30.48;
    var data = await fetchData(weight, height);
    console.log(data);
  });
async function fetchData(weight, height) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c102ffcecemsh31fee262b485c63p1b464fjsn535ea8fa7b4e",
      "X-RapidAPI-Host": "mega-fitness-calculator1.p.rapidapi.com",
    },
  };
  fetch(
    `https://mega-fitness-calculator1.p.rapidapi.com/bmi?weight=${weight}&height=${height}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      var BMIel = document.createElement("p");
      BMIel.textContent = "Your BMI: " + data.info.bmi;
      var HEALTHel = document.createElement("p");
      HEALTHel.textContent = "Health Category: " + data.info.health;
      var RANGE = document.createElement("p");
      RANGE.textContent = "Healthy BMI Range: " + data.info.healthy_bmi_range;
      var card = document.createElement("article");
      card.setAttribute("class", "card1");
      var output = document.querySelector("#outputBmi");
      card.append(BMIel, HEALTHel, RANGE);
      output.append(card);
      console.log(data);
    })
    .catch((err) => console.error(err));
}
var API_URL = "https://mega-fitness-calculator1.p.rapidapi.com/";
var API_KEY = "c102ffcecemsh31fee262b485c63p1b464fjsn535ea8fa7b4e";
async function fetchAllData(endpoint) {
  var url = `${API_URL}${endpoint}`;
  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
    },
  };
}
