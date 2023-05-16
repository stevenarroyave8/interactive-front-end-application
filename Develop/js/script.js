// wait for the page to finish loading before running any JS code
window.addEventListener('load', function() {
  // Create event listener to generate a dish
  var dishForm = document.getElementById('dishIngredientsForm');
  var dishButton = document.getElementById('generateDishButton');
  dishButton.addEventListener('click', function () {
    var dishIngredients = document.querySelectorAll('input[name="dishIngredients"]:checked');
    // We should write generateDish so that it calls displayGeneratedDish automatically
    //  like what we have for generateCocktail
    var generatedDish = generateDish(dishIngredients);
    displayGeneratedDish(generatedDish);
  })

  // Create event listener to generate a cocktail
  var drinkForm = document.getElementById('dishIngredientsForm');
  var drinkButton = document.getElementById('generateDishButton');
  drinkButton.addEventListener('click', function () {
    var drinkIngredients = document.querySelectorAll('input[name="cocktailIngredients"]:checked');
    generateCocktail(drinkIngredients);
  })
 
 // function to generate a dish based on the selected ingredients
 function generateDish(ingredients) {
    // TODO: dish generation logic here
    var foodUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    async function getFoodApi() {
      try {
        const response = await fetch(foodUrl);
        if (!response.ok) {
          throw Error('Failed to fetch data from the API');
        }
        const data = await response.json();
        const meals = data.meals;
    
        if (meals && meals.length > 0) {
            meals.forEach((meal) => {
              for (let i = 1; i <= 20; i++) {
                const ingredient = meal['strIngredient' + i];
                const measurement = meal['strMeasure' + i];
                if (ingredient && measurement) {
                  console.log('Ingredient:', ingredient, 'Measurement:', measurement);
                }
            }
          });
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }  
    getFoodApi();

  }
// function to generate a cocktail based on the selected ingredients and the generated dish
  function generateCocktail(ingredient) {
    var url = "www.thecocktaildb.com/api/json/v1/1/random.php?i=" + ingredient;
    //var url = "www.thecocktaildb.com/api/json/v1/1/popular.php?i=" + ingredient;
    var drinkImg;
    var instructions;
    var ingredients = [];
    var measurements = [];

    fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                drinkImg = data.strDrinkThumb + "/preview";
                instructions = data.strInstructions;
                // I dont want to do it this way, but the api doesn't group them into an array,
                //  so I can't do it iteratively
                ingredients.push(data.strIngredient1);
                ingredients.push(data.strIngredient2);
                ingredients.push(data.strIngredient3);
                ingredients.push(data.strIngredient4);
                ingredients.push(data.strIngredient5);
                ingredients.push(data.strIngredient6);
                ingredients.push(data.strIngredient7);
                ingredients.push(data.strIngredient8);
                ingredients.push(data.strIngredient9);
                ingredients.push(data.strIngredient10);
                ingredients.push(data.strIngredient11);
                ingredients.push(data.strIngredient12);
                ingredients.push(data.strIngredient13);
                ingredients.push(data.strIngredient14);
                ingredients.push(data.strIngredient15);
                measurements.push(data.strMeasure1);
                measurements.push(data.strMeasure2);
                measurements.push(data.strMeasure3);
                measurements.push(data.strMeasure4);
                measurements.push(data.strMeasure5);
                measurements.push(data.strMeasure6);
                measurements.push(data.strMeasure7);
                measurements.push(data.strMeasure8);
                measurements.push(data.strMeasure9);
                measurements.push(data.strMeasure10);
                measurements.push(data.strMeasure11);
                measurements.push(data.strMeasure12);
                measurements.push(data.strMeasure13);
                measurements.push(data.strMeasure14);
                measurements.push(data.strMeasure15);
            })
        } else {
            alert('Error: ' + response.statusText);
        }
    })

    displayGeneratedCocktail([drinkImg, instructions, ingredients, measurements]);
    }
// function to display the generated dish on the page
  function displayGeneratedDish(dish) {
    // TODO: dish display logic here
        // create an array to hold the selected ingredients
        var selectedIngredients = [];
        // loop through the ingredients list and add the value of each checked ingredient to the selectedIngredients array
     ingredients.forEach(function(ingredient) {
       selectedIngredients.push(ingredient.value);
       // TODO: use array to generate dish using the API? to get recipe database
     });
  
  }
// Define the function to display the generated cocktail on the page
  function displayGeneratedCocktail(cocktail) {
    // TODO: cocktail display logic here
    var drinkImg = cocktail[0];
    var instructions = cocktail[1];
    var ingredients = cocktail[2];
    var measurements = cocktail[3];
    var cocktailImg = document.getElementById("cocktail-img");
    var cocktailInstructions = document.getElementById("cocktail-instructions");
  var cocktailIngredients = document.getElementById("cocktail-ingredients");
  cocktailImg.src = drinkImg;
  cocktailInstructions.innerText = instructions;
  // Create an unordered list to hold the cocktail ingredients
  var ingredientsList = document.createElement("ul");
  // Loop through the ingredients and measurements to create list items
  for (var i = 0; i < ingredients.length; i++) {
    var ingredient = ingredients[i];
    var measurement = measurements[i];
    // If the measurement is not null or empty, add it to the list item
    if (measurement) {
        var listItem = document.createElement("li");
        listItem.innerText = measurement + " " + ingredient;
        ingredientsList.appendChild(listItem);
      }
    }
     // Add the list of ingredients to the cocktail ingredients element
  cocktailIngredients.appendChild(ingredientsList);
  }

});

// Add event listeners to form submission buttons
var generateDishButton = document.getElementById('generateDishButton');
generateDishButton.addEventListener('click', displayGeneratedDish);

var generateCocktailButton = document.getElementById('generateCocktailButton');
generateCocktailButton.addEventListener('click', displayGeneratedCocktail);

