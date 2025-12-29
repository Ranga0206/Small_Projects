const inputSearch = document.getElementById("input-search");
const searchBtn = document.getElementById("search-btn");
const categories = document.querySelectorAll("#categories");
const closeBtn = document.getElementById("close-btn");
const foodMainContainer = document.querySelector(".food-main-container");
const displayCard = document.querySelector(".display-card-container");

searchBtn.addEventListener("click", async function () {
  const inputValue = inputSearch.value.toLowerCase().trim();
  console.log(inputValue);
  displayCard.innerHTML = `
 <P class="loading">
  <img  src="asset/loading.gif" alt="loading...">
 </P>
`;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`
    );
    const data = await response.json();
    displayCard.innerHTML = "";

    data.meals.forEach((data) => {
      const div = document.createElement("div");
      div.classList.add("card-item");
      div.innerHTML = `  <img
          src="${data.strMealThumb}"
          alt="food"
        />
        <div class="food-name">
          <button onclick=show(${data.idMeal}) class="food-btn">${data.strMeal}</button>
        </div>
      </div>`;
      displayCard.appendChild(div);
    });
  } catch (error) {
    console.log("Error : ", error);
  } finally {
    inputSearch.value = "";
  }
});

async function init() {
  displayCard.innerHTML = `
 <P class="loading">
  <img  src="asset/loading.gif" alt="loading...">
 </P>
`;
  try {
    const meals = [];
    const maxAttempts = 20;
    let attempts = 0;
    const mealsId = new Set();
    while (meals.length < 15 && attempts < maxAttempts) {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      if (data.meals) {
        const meal = data.meals[0];
        if (!mealsId.has(meal.idMeal)) {
          mealsId.add(meal.idMeal);
          meals.push(meal);
        }
      }
      attempts++;
    }
    // console.log(meals);
    displayCard.innerHTML = "";
    meals.forEach((data) => {
      const div = document.createElement("div");
      div.classList.add("card-item");
      div.innerHTML = `  <img
          src="${data.strMealThumb}"
          alt="food"
        />
        <div class="food-name">
          <button onclick=show(${data.idMeal}) class="food-btn">${data.strMeal}</button>
        </div>
      </div>`;
      displayCard.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

// window.onload = async function name() {
//   displayCard.innerHTML = `
//  <P class="loading">
//   <img  src="asset/loading.gif" alt="loading...">
//  </P>
// `;
//   try {
//     const meals = [];
//     const maxAttempts = 20;
//     let attempts = 0;
//     const mealsId = new Set();
//     while (meals.length < 15 && attempts < maxAttempts) {
//       const response = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/random.php"
//       );
//       const data = await response.json();
//       if (data.meals) {
//         const meal = data.meals[0];
//         if (!mealsId.has(meal.idMeal)) {
//           mealsId.add(meal.idMeal);
//           meals.push(meal);
//         }
//       }
//       attempts++;
//     }
//     // console.log(meals);
//     displayCard.innerHTML = "";
//     meals.forEach((data) => {
//       const div = document.createElement("div");
//       div.classList.add("card-item");
//       div.innerHTML = `  <img
//           src="${data.strMealThumb}"
//           alt="food"
//         />
//         <div class="food-name">
//           <button onclick=show(${data.idMeal}) class="food-btn">${data.strMeal}</button>
//         </div>
//       </div>`;
//       displayCard.appendChild(div);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

function closeContainer() {
  foodMainContainer.classList.remove("show");
  displayCard.style.opacity = "1";
}

async function show(id) {
  foodMainContainer.innerHTML = "";
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    displayCard.style.opacity = "0.3";

    const response = await fetch(url);
    const data = await response.json();
    const meal = data.meals[0];

    const ingredients = [];

    function mealIngredient(meal) {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(
            "<li>" + `${ingredient}` + " " + `${measure}` + "</li>"
          );
        }
      }
    }

    // console.log(ingredients);

    mealIngredient(meal);

    foodMainContainer.classList.add("show");
    const card = `   <div class="close-container">
        <button onclick=" closeContainer()" id="close-btn" class="close-btn">
          <span><ion-icon size="large" name="close"></ion-icon></span>
        </button>
      </div>

      <div class="food-container">
        <div class="food-img-container">
          <img
            src="${meal.strMealThumb}"
            alt="food"
          />
        </div>
        <div class="food-details">
          <h1>Ingredient <span>(${meal.strMeal})</span></h1>
          <ul>
        ${ingredients.join("")}
          </ul>
        </div>
      </div>
      <h3 class="food-intro">Instructions :</h3>
      <div class="food-para">
        <p>
         ${meal.strInstructions}
        </p>
      </div>`;
    foodMainContainer.innerHTML += card;
  } catch (error) {
    console.log("Error In fetch food Details");
  }
}

categories.forEach((data) =>
  data.addEventListener("change", async (e) => {
    let category = e.target.options[e.target.selectedIndex].value;
    // console.log(category);

    displayCard.innerHTML = `
 <P class="loading">
  <img  src="asset/loading.gif" alt="loading...">
 </P>
`;
    try {
      const meals = [];
      const maxAttempts = 30;
      let attempts = 0;
      const mealsId = new Set();
      while (meals.length < 30 && attempts < maxAttempts) {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );

        const data = await response.json();

        data.meals.forEach((data) => {
          if (category != "") {
            if (data.strCategory == category) {
              const meal = data;
              if (!mealsId.has(meal.idMeal)) {
                mealsId.add(meal.idMeal);
                meals.push(meal);
              }
            }
          }
        });

        attempts++;
      }
      // console.log(meals);
      displayCard.innerHTML = "";

      meals.forEach((data) => {
        const div = document.createElement("div");
        div.classList.add("card-item");
        div.innerHTML = `  <img
          src="${data.strMealThumb}"
          alt="food"
        />
        <div class="food-name">
          <button onclick=show(${data.idMeal}) class="food-btn">${data.strMeal}</button>
        </div>
      </div>`;
        displayCard.appendChild(div);
      });
    } catch (error) {
      console.log(error);
    }
  })
);

init();
