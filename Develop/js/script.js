function getCocktail(ingredient) {
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

    // TODO: figure out what to do with the data nowthat we have it
}