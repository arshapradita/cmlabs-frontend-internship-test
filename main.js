let url = "https://www.themealdb.com/api/json/v1/1/";

let app = document.querySelector(".app");
let screen = {
  main: app.querySelector(".main-screen"),
  recipe: app.querySelector(".recipe-screen"),
};

// List Categories
(async function () {
  let res = await fetch(url + "categories.php");
  let data = await res.json();
  let categories = data.categories;

  for (let i = 1; i < categories.length; i++) {
    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                <div class="card h-100">
                    <img
                      src="${categories[i].strCategoryThumb}"
                      class="card-img-top"
                      alt="..."
                    />
                    <a href="cat-detail.html" onClick="${getRecipesOfCategory(
                      categories[i].strCategory
                    )}">
                    <div class="card-body">
                    <h5 class="card-title text-center fs-6">${
                      categories[i].strCategory
                    }</h5>
                    </div>
                    </a>
                </div> 
                  
    `;

    div.addEventListener("click", function () {
      screen.main
        .querySelector(".categories .active")
        .classList.remove("active");
      div.classList.add("active");
      getRecipesOfCategory(categories[i].strCategory);
    });

    if (i == 1) {
      div.classList.add("active");
      getRecipesOfCategory(categories[i].strCategory);
    }

    screen.main.querySelector(".categories").appendChild(div);
  }
})();

// // Category Details
// async function getRecipesOfCategory(category) {
//   screen.main.querySelector(".recipe-list").innerHTML = "";

//   try {
//     let res = await fetch(url + "filter.php?c=" + category);
//     let data = await res.json();
//     let recipes = data.meals;

//     for (let i = 0; i < recipes.length; i++) {
//       let div = document.createElement("div");

//       div.classList.add("item");

//       //   div.addEventListener("click", function () {
//       //     showFullRecipe(recipes[i].idMeal);
//       //   });

//       div.innerHTML = `
//                 <div class="thumbnail">
//                     <img src="${recipes[i].strMealThumb}"/>
//                 </div>
//                 <div class="details">
//                     <h2>${recipes[i].strMeal}</h2>
//                 </div>
//             `;

//       screen.main.querySelector(".recipe-list").appendChild(div);
//     }
//   } catch (msg) {}
// }

//cobabb
async function getRecipesOfCategory(category) {
  screen.main.querySelector(".recipe-list").innerHTML = "";

  try {
    let res = await fetch(url + "filter.php?c=" + category);
    let data = await res.json();
    let cat = data.meals;

    for (let i = 0; i < cat.length; i++) {
      let div = document.createElement("div");

      div.classList.add("item");

      //   div.addEventListener("click", function () {
      //     showFullRecipe(recipes[i].idMeal);
      //   });

      div.innerHTML = `
                <div class="thumbnail">
                    <img src="${cat[i].strMealThumb}"/>
                </div>
                <div class="details">
                    <h2>${cat[i].strMeal}</h2>
                </div>
            `;

      screen.main.querySelector(".recipe-list").appendChild(div);
    }
  } catch (msg) {}
}
