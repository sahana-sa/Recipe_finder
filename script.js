function searchRecipe(){
    const searchInput=document.getElementById('searchInput').value;
    const recipesDiv=document.getElementById('recipes');
    const notFoundDiv=document.getElementById('notFound');

    recipesDiv.innerHTML='';
    notFoundDiv.style.display='none';

    if(searchInput.trim()===''){
        notFoundDiv.innerHTML='Please enter recipe name to search';
        notFoundDiv.style.display='block';
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response=>response.json())
    .then(data=>{
        if(!data.meals){
            notFoundDiv.innerText='Recipe nnot found,please try another search !'
            notFoundDiv.style.display='block';
        }
        else{
            data.meals.forEach(meal=>{
                const card=document.createElement('div');
                card.classList.add('recipe-card');
                card.innerHTML=`
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <button onclick="viewRecipes('${meal.idMeal}')">view Recipe</button>
                `;
                recipesDiv.appendChild(card);
            });
        }
    });;


}


function viewRecipes(mealId) {
    const popupCard = document.getElementById('popupCard');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeDetails = document.getElementById('recipeDetails');

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            if (!meal) {
                recipeTitle.innerText = "Recipe not found";
                recipeDetails.innerText = "";
                return;
            }
            recipeTitle.innerText = meal.strMeal;
            recipeDetails.innerText = meal.strInstructions; 
            popupCard.style.display = 'block';
            let ingredients = "";
for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
        ingredients += `${ingredient} - ${measure}\n`;
    }
}

recipeDetails.innerText = meal.strInstructions + "\n\nIngredients:\n" + ingredients;

        })
        .catch(err => {
            recipeTitle.innerText = "Error loading recipe";
            recipeDetails.innerText = err;
            popupCard.style.display = 'block';
        });
}


function closeRecipe(){
    document.getElementById('popupCard').style.display='none';
}