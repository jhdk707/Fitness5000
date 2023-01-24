document.addEventListener("DOMContentLoaded", function () {
  // Timer function to present local date and time in header
  const currentDay = document.querySelector(".currentDay");
  setInterval(() => {
    let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
    currentDay.innerHTML = time;
  }, 1000);
});
function sConsole(event) {
  event.preventDefault();
  var data = document.getElementById("caloriesIntake");
  if (isNaN(data.value)) {
    //checks for non numerical values and rejects them
    alert("Please enter a valid number.");
  } else {
    console.log(data.value);
  }
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
searchbtn.on("click", input);
