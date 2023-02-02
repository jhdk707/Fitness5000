Fitness5000 created on 1/19/2023 by Isaiah James, Jesse Hudak, Nate James, Jonathan Chen as part of the UC Berkeley Extension Bootcamp.

# Fitness5000

Our web application is designed to help clients acheive their fitness goals on a daily basis.
When a user opens the app they will be prompted to fill in their name, which will be stored at the top of the web page with the current date and time.
After submitting your name it is encouraged that a client fill in their current height & weight. This will provide the client with their current BMI metric.
Whether a client wants to gain or loose weight they will be able to use the calorie tracker to their advantage. They must enter numbers, if they enter any other character a modal will pop up asking the client to submit a valid number.
Moving over to the excerise portion, We have provided clients with a drop down menu to choose what style of excerise they would like to preform. This drop down menu is powered by an API, that stores all of the exercises. After a client selects the style of excerise they would like to preform they press search and will be provided with an excerise. Clients will be shown a single excerise at a time and our API breaks down how the excerise should be preformed, specificies what if any equipment is needed and for some excerises the average amount of calories burned per hour. Clients can either choose to do the exericise that is displayed or they can skip around and find one that interests them most.

## User Story

```
As a Fitness Company we want to develop a fitness app that generates a new workout on a daily basis while it also monitors fitness stats and caloric intake in order to help clients reach a desired weight and body type over time.
```

## Acceptance Criteria

```
GIVEN a fitness application starting page
THEN the user creates a Username and body fitness profile
WHEN I start the app
THEN I am presented with a specific workout generated based on parameters given
WHEN the app restarts for the next day
THEN the user is presented with a new workout
WHEN a user opens the app
THEN they can track their daily caloric intake
WHEN I update my calorie intake
THEN the app tracks amount consumed for the day / week

RESOURCES
https://rapidapi.com/bejjaothmane/api/mega-fitness-calculator1/
https://rapidapi.com/apininjas/api/exercises-by-api-ninjas/
CSS styled using Bulma.io


## Mock-Up

The following image shows the web application's appearance and functionality:

![alt text](https://github.com/jhdk707/Fitness5000/blob/main/assets/fitness5000screencap.png)
```

## Application Link

https://jhdk707.github.io/Fitness5000/
