var searchbtn = $("#searchbutton");

let activityinput = "";

var finaloutput = $("#output");

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
