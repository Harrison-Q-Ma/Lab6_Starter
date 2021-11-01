// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json', 
  'assets/recipes/custom_recipe_1.txt', 
  'assets/recipes/custom_recipe_2.txt', 
  'assets/recipes/custom_recipe_3.txt'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {

  for (var i = 0; i < recipes.length; i ++) {
    let response = await fetch(recipes[i])
    
    let data = await response.json()
    // console.log(data)
    recipeData[recipes[i]] = (data)
  }

  return true
}

function createRecipeCards() {

  const m = document.querySelector('main')
  var count = 0

  for (const [key, value] of Object.entries(recipeData)) {
    if (count < 3) {
      var recipe = document.createElement('recipe-card')
      recipe.data = value
      m.appendChild(recipe)
    }
    else {
      break; 
    }
    count += 1
  }
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
}

var clicked = false

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  var button = document.querySelector('button')

  button.addEventListener("click", myFunction)
}

function myFunction(){
  var button = document.querySelector('button')
  if (clicked == false) {
    clicked = true
    button.textContent = 'Show Less'
    const m = document.querySelector('main')
    var count = 0
    for (const [key, value] of Object.entries(recipeData)) {
      if (count >= 3) {
        var recipe = document.createElement('recipe-card')
        recipe.data = value
        m.appendChild(recipe)
      }
      count += 1
    }
  }
  else {
    clicked = false
    button.textContent = 'Show More'
    var recipe_elems = document.querySelectorAll('recipe-card')
    for (var i = 3; i < 6; i ++) {
      recipe_elems[i].parentNode.removeChild(recipe_elems[i])
    }
  }
}