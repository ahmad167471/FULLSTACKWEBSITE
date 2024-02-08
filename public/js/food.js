// Large screen search functionality
const search = document.getElementById("search");
const btn = document.getElementById("btn");
const totalfoods = document.getElementById("totalfoods");

btn.addEventListener("click", () => {
  const searchText = search.value.trim();
  getFoodList(searchText, totalfoods);
});

// Mobile menu search functionality
const mobileSearch = document.getElementById("searchMobile");
const mobileBtn = document.getElementById("btnMobile");
const mobileTotalFoods = document.getElementById("totalfoods");

mobileBtn.addEventListener("click", () => {
  const searchText = mobileSearch.value.trim();
  getFoodList(searchText, mobileTotalFoods);
});

function getFoodList(searchText, targetElement) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                        <div class="foodcard">
                            <img src="${meal.strMealThumb}" alt="" class="foods">
                            <h2 id="mealTitle">${meal.strMeal}</h2>
                            <div id="ingidButtoin">
                            <button class="toggleIngredientsBtn" onclick="toggleIngredients(this, ${meal.idMeal})">See Ingredients</button>
                        </div>
                        </div>`;

        });
        targetElement.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        targetElement.classList.add("notFound");
      }

      targetElement.innerHTML = html;
    });
}

// Function to toggle the visibility of ingredients
function toggleIngredients(button, mealId) {
  const foodCard = button.closest(".foodcard");
  const ingredientsContainer = createIngredientsContainer(mealId);

  // Append the ingredients container to the food card
  foodCard.appendChild(ingredientsContainer);
}

// Function to create the ingredients container
function createIngredientsContainer(mealId) {
  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredientsContainer");

  // Fetch and append ingredients to the container
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((mealData) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = mealData.meals[0][`strIngredient${i}`];
        const measure = mealData.meals[0][`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      ingredientsContainer.innerHTML = `
                <h3 class="ingredientslist">Ingredients:</h3>
                <ul class="listitems">${ingredients
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}</ul>
                  <div id="closeIngdBtn">
                <button class="closeIngredientsBtn" onclick="closeIngredients(this)">Close</button>
                </div>
                `;
    });

  return ingredientsContainer;
}

// Function to close the ingredients container
function closeIngredients(button) {
  const ingredientsContainer = button.parentNode;
  ingredientsContainer.remove();
}

// Function to toggle the visibility of ingredients

// Function to toggle the visibility of ingredients
function toggleIngredients(button, mealId) {
  const overlay = createOverlay();
  document.body.appendChild(overlay);

  const ingredientsContainer = createIngredientsContainer(mealId);
  overlay.appendChild(ingredientsContainer);

  // Add a class to the body to disable scrolling while the overlay is active
  document.body.classList.add("overlay-active");
}

// Function to create the overlay
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.addEventListener("click", () => {
    // Close the overlay when clicking outside the ingredients container
    document.body.removeChild(overlay);
    document.body.classList.remove("overlay-active");
  });
  return overlay;
}

// Function to create the ingredients container
// function createIngredientsContainer(mealId) {
//   const ingredientsContainer = document.createElement("div");
//   ingredientsContainer.classList.add("ingredientsContainer");


//   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
//     .then((response) => response.json())
//     .then((mealData) => {
//       const ingredients = [];
//       for (let i = 1; i <= 20; i++) {
//         const ingredient = mealData.meals[0][`strIngredient${i}`];
//         const measure = mealData.meals[0][`strMeasure${i}`];
//         if (ingredient && ingredient.trim() !== "") {
//           ingredients.push(`${ingredient} - ${measure}`);
//         }
//       }

//       ingredientsContainer.innerHTML = `
//                 <h3>Ingredients:</h3>
//                 <ul>${ingredients
//                   .map((ingredient) => `<li>${ingredient}</li>`)
//                   .join("")}</ul>
//                 <button class="closeIngredientsBtn" onclick="closeIngredients(this)">Close</button>`;
//     });

//   return ingredientsContainer;
// }
