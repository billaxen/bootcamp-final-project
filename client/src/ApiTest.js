// const request = require('request-promise');

// const getRandomMeal = async () => {
//   const options = {
//     uri: 'https://www.themealdb.com/api/json/v1/1/random.php',
//     headers: {
//       'User-Agent': 'Request-Promise',
//       'Accept': 'application/json'
//     }
//   };
//   const response = await request(options);
//   const data = JSON.parse(response);
//   const meal = data.meals[0];
//   return meal;
// };

// getRandomMeal()
//   .then(meal => {
//     console.log(`Name: ${meal.strMeal}`);
//     console.log(`Category: ${meal.strCategory}`);
//     console.log(`Area: ${meal.strArea}`);
//     console.log(`Instructions: ${meal.strInstructions}`);
//     console.log(`Ingredients: ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ...`);
//   })
//   .catch(error => console.log(error));


//   getRandomMeal().then((data) => console.log(data));
