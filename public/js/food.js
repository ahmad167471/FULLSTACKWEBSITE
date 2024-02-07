

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
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                        <div class="foodcard">
                            <img src="${meal.strMealThumb}" alt="" class="foods">
                            <h2 id="mealTitle">${meal.strMeal}</h2>
                            <button class="order">Order</button>
                        </div>`;
                });
                targetElement.classList.remove("notFound");
            } else {
                html = "Sorry, we didn't find any meal!";
                targetElement.classList.add("notFound");
            }

            targetElement.innerHTML = html;
        });
};
