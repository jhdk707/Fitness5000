var searchbtn = $("#searchbutton");

let activityinput = "";

var finaloutput = $("#output");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '396d65978cmsh536e29951248595p199c25jsn69e49935a220',
		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=skiing', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



function input() {
    var activityinput = $("#searchinput").val();
    fetch('https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=' + activityinput, options)
	.then(response => response.json())   
    .then(function(response) {
    var activityname = response[0].name;

    var calories = response[0].calories_per_hour;
    var caloriesEl = $('<p>');
    caloriesEl.text("Calories per hour: " + calories);

    finaloutput.text("Name: " + activityname);
    finaloutput.append(caloriesEl);
    

    
    })
    .catch(err => console.error(err));
}


searchbtn.on("click", input);