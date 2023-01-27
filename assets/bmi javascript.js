// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'c102ffcecemsh31fee262b485c63p1b464fjsn535ea8fa7b4e',
//         'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
//     }
// };

// fetch('https://mega-fitness-calculator1.p.rapidapi.com/bmi?weight=65&height=167', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// {
//     "info": {
//         "bmi": 23.67,
//             "health": "Normal Weight"
//     }
// }



const API_URL = 'https://mega-fitness-calculator1.p.rapidapi.com/';
const API_KEY = 'c102ffcecemsh31fee262b485c63p1b464fjsn535ea8fa7b4e';

async function fetchData(endpoint) {
    const url = `${API_URL}${endpoint}`
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
    };




    document.getElementById('fetch-data-button').addEventListener('click', function () {
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        fetchData(weight, height).then(data => {
            console.log(data);

            // print keys here: bmi, health, healthy_bmi_range
            then((response) => response.json())
                .then(function (response) {
                    response.forEach((e) => {
                        var templateStringBMI =
                            '<article class="card1">' < p >
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
        });
    });

    async function fetchData(weight, height) {
        const url = `${API_URL}bmi?weight=${weight}&height=${height}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
            },
        };

        try {
            const response = await fetch(url, options)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
        console.log(data);
    };
};

const data = fetchData('bmi');
console.log(data);

        // {
        //     "info": {
        //         "bmi": 24.54,
        //             "health": "Normal Weight",
        //                 "healthy_bmi_range": "18.5-24.9"
        //     }
        // }