const search = document.getElementById("search");
const btn = document.getElementById("btn");
const totalfoods = document.getElementById("totalfoods");

btn.addEventListener("click", () => {
    const searchText = search.value.trim();
    getfoodlist(searchText);
});

function getfoodlist(searchText) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                        <div class="foodcard">
                            <img src="${meal.strMealThumb}" alt="" class="foods">
                            <h2>${meal.strMeal}</h2>
                            <button class="order">Order</button>
                        </div>`;
                });
                totalfoods.classList.remove("notFound");
            } else {
                html = "Sorry, we didn't find any meal!";
                totalfoods.classList.add("notFound");
            }

            totalfoods.innerHTML = html;
        });
};
