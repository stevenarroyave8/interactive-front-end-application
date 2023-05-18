// wait for the page to finish loading before running any JS code
window.addEventListener("load", function () {
  // Create event listener to generate a dish
  var dishForm = document.getElementById("dishIngredientsForm");
  var dishButton = document.getElementById("generateDishButton");
  dishButton.addEventListener("click", function (event) {
    event.preventDefault()
    var dishIngredients = document.querySelector("#ingredient1").value;
    // We should write generateDish so that it calls displayGeneratedDish automatically
    //  like what we have for generateCocktail
    var generatedDish = generateDish(dishIngredients);
    // displayGeneratedDish(generatedDish);
  });

  // Create event listener to generate a cocktail
  var drinkForm = document.getElementById("cocktailIngredientsForm");
  var drinkButton = document.getElementById("generateCocktailButton");
  drinkButton.addEventListener("click", function (event) {
    event.preventDefault();
    var drinkIngredients = document.querySelector("#cocktailIngredient").value;
    generateCocktail(drinkIngredients);
  });

  // function to generate a dish based on the selected ingredients
  async function generateDish(ingredients) {
    console.log(ingredients);
    async function generateDish (instructions){
      console.log(instructions)
    }
    // TODO: dish generation logic here
    var foodUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;

    try {
      const response = await fetch(foodUrl);
      if (!response.ok) {
        throw Error("Failed to fetch data from the API");
      }
      const data = await response.json();
      const meals = data.meals;

      if (meals && meals.length > 0) {
        meals.forEach((meal) => {
          console.log(meal);
     //      for (let i = 1; i <= 20; i++) {
     //        const ingredient = meal["strIngredient" + i];
     //        const measurement = meal["strMeasure" + i];
     //        if (ingredient && measurement) {
     //          console.log(
     //            "Ingredient:",
     //            ingredient,
     //           "Measurement:",
     //           measurement
     //       );
     //       }
     //      }
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  // function to generate a cocktail based on the selected ingredients and the generated dish
  function generateCocktail(ingredient) {
    var url =
      "https://www.thecocktaildb.com/api/json/v1/1/random.php?i=" + ingredient;
    //var url = "www.thecocktaildb.com/api/json/v1/1/popular.php?i=" + ingredient;
    var drinkImg;
    var instructions;
    var ingredients = [];
    var measurements = [];

    fetch(url).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          drinkImg = data.drinks[0].strDrinkThumb;// + "/preview";
          instructions = data.drinks[0].strInstructions;
          // I dont want to do it this way, but the api doesn't group them into an array,
          //  so I can't do it iteratively
          ingredients.push(data.drinks[0].strIngredient1);
          ingredients.push(data.drinks[0].strIngredient2);
          ingredients.push(data.drinks[0].strIngredient3);
          ingredients.push(data.drinks[0].strIngredient4);
          ingredients.push(data.drinks[0].strIngredient5);
          ingredients.push(data.drinks[0].strIngredient6);
          ingredients.push(data.drinks[0].strIngredient7);
          ingredients.push(data.drinks[0].strIngredient8);
          ingredients.push(data.drinks[0].strIngredient9);
          ingredients.push(data.drinks[0].strIngredient10);
          ingredients.push(data.drinks[0].strIngredient11);
          ingredients.push(data.drinks[0].strIngredient12);
          ingredients.push(data.drinks[0].strIngredient13);
          ingredients.push(data.drinks[0].strIngredient14);
          ingredients.push(data.drinks[0].strIngredient15);
          measurements.push(data.drinks[0].strMeasure1);
          measurements.push(data.drinks[0].strMeasure2);
          measurements.push(data.drinks[0].strMeasure3);
          measurements.push(data.drinks[0].strMeasure4);
          measurements.push(data.drinks[0].strMeasure5);
          measurements.push(data.drinks[0].strMeasure6);
          measurements.push(data.drinks[0].strMeasure7);
          measurements.push(data.drinks[0].strMeasure8);
          measurements.push(data.drinks[0].strMeasure9);
          measurements.push(data.drinks[0].strMeasure10);
          measurements.push(data.drinks[0].strMeasure11);
          measurements.push(data.drinks[0].strMeasure12);
          measurements.push(data.drinks[0].strMeasure13);
          measurements.push(data.drinks[0].strMeasure14);
          measurements.push(data.drinks[0].strMeasure15);
          displayGeneratedCocktail(drinkImg, instructions, ingredients, measurements);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    });

    
  }
  // function to display the generated dish on the page
  function displayGeneratedDish(dish) {
    // TODO: dish display logic here
    // create an array to hold the selected ingredients
    var selectedIngredients = [];
    // loop through the ingredients list and add the value of each checked ingredient to the selectedIngredients array
    dish.forEach(function (ingredient) {
      selectedIngredients.push(ingredient.value);
      // TODO: use array to generate dish using the API? to get recipe database
    });
  }
  // Define the function to display the generated cocktail on the page
  function displayGeneratedCocktail(drinkImg, instructions, ingredients, measurements) {
    // TODO: cocktail display logic here
    console.log(drinkImg);
    console.log(instructions);
    console.log(ingredients);
    console.log(measurements);
    var cocktailImg = document.getElementById("cocktail-img");
    var cocktailInstructions = document.getElementById("cocktail-instructions");
    var cocktailIngredients = document.getElementById("cocktail-ingredients");
    cocktailImg.src = drinkImg;
    cocktailInstructions.innerText = instructions;
    cocktailInstructions.style.display ="none"
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
    cocktailIngredients.style.display = "none"
    var recipeBtn = document.createElement("button")
    recipeBtn.textContent = "Click"
    var container = document.querySelector(".imgContainer");
    container.appendChild(recipeBtn);
    recipeBtn.addEventListener ("click", function(){
    var imgEl = document.getElementById("cocktail-img")
    imgEl.style.opacity = "50%";
    cocktailIngredients.style.display = "block"; 
    cocktailInstructions.style.display = "block";
    recipeBtn.style.display = "none"
    });
    

  }
});
