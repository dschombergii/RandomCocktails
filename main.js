let randomCocktails = []
let userFavorites = []

class RandomCocktail {
    constructor(name, picture, category, alcoholic, glass, instructions, ingredients) {
        this.name = name;
        this.picture = picture;
        this.category = category;
        this.alcoholic = alcoholic;
        this.glass = glass;
        this.instructions = instructions;
        this.ingredients = ingredients
    }
}

const randomCocktail = () => {
    document.getElementById('cocktailsHeader').innerHTML = 'Cocktails!'
    document.getElementById('randomizerLabel').innerHTML = 'Another round? '

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(cocktail => {
            createClass(cocktail.drinks[0])
        })
}

const createClass = (cocktail) => {
    randomCocktails = []
    let name = cocktail.strDrink
    let picture = cocktail.strDrinkThumb
    let category = cocktail.strCategory
    let alcoholic = cocktail.strAlcoholic
    let glass = cocktail.strGlass
    let instructions = cocktail.strInstructions

    let ingredients = []
    for (let i = 1; i < 15; i++) {
        if ((cocktail['strIngredient' + i] !== null) & (cocktail['strIngredient' + i] !== "")) {
            let ingredient = []
            ingredient.push(cocktail['strMeasure' + i])
            ingredient.push(cocktail['strIngredient' + i])
            ingredients.push(ingredient.join(' '))
        }
    }

    let newCocktail = new RandomCocktail(name, picture, category, alcoholic, glass, instructions, ingredients)

    console.log(newCocktail)
    randomCocktails.push(newCocktail)
    console.log(randomCocktails)
    addRandomCard()
}

const addRandomCard = () => {
    let cardDisplay = document.getElementById('cocktailCards')
    cardDisplay.innerHTML = ''
    let randomCocktail = randomCocktails[0]
    card = createCard(randomCocktail)
    cardDisplay.append(card)

    let instructions = document.getElementById('instructionsDiv' + userFavorites.length)

    let saveButton = document.createElement('button')
    let likeIt = document.createElement('label')
    saveButton.id = 'saveButton'
    saveButton.addEventListener('click', function () {
        this.parentNode.parentNode.remove()
        saveCard()
    })
    saveButton.innerHTML = 'Save'
    likeIt.innerHTML = 'Like it?'
    instructions.append(likeIt)
    instructions.append(saveButton)
}

const saveCard = () => {
    document.getElementById('savedCards').style.visibility = "visible"
    let savedDisplay = document.getElementById('userCards')
    let savedCocktail = randomCocktails[0]
    userFavorites.push(savedCocktail)
    card = createCard(savedCocktail)
    card.id = 'savedCard' + userFavorites.length
    savedDisplay.append(card)

    let instructions = document.getElementById('instructionsDiv' + userFavorites.length)

    let removeButton = document.createElement('button')
    removeButton.id = 'removeButton'
    removeButton.addEventListener('click', function () {
        this.parentNode.parentNode.remove()
    })
    removeButton.innerHTML = 'Remove'
    instructions.append(removeButton)

}

const createCard = (newCocktail) => {
    let card = document.createElement('div')
    let cardPic = document.createElement('div')
    let cardRecipe = document.createElement('div')
    let cardRecipeInstructions = document.createElement('div')
    card.id = 'recipeCard'
    card.classList = 'row recipeCard no-gutters'
    cardPic.classList = 'pic col-lg-6'
    cardRecipe.classList = 'recipe col-lg-6 text-center'
    cardRecipeInstructions.classList = 'recipeInstructions col-12 text-center'
    cardRecipeInstructions.id = 'instructionsDiv' + userFavorites.length

    let cardImage = document.createElement('div')
    cardImage.classList = 'cardImage'
    let img = new Image()
    img.src = newCocktail.picture
    cardImage.append(img)
    cardPic.append(cardImage)

    let cardName = document.createElement('h2')
    cardName.id = 'name'
    cardName.innerHTML = newCocktail.name
    cardRecipe.append(cardName)

    let cardCategory = document.createElement('div')
    cardCategory.id = 'category'
    let ages = ''
    if (newCocktail.alcoholic === 'Alcoholic') {
        ages = '21+'
    } else {
        ages = 'All ages!'
    }
    cardCategory.innerHTML = `Category: ${newCocktail.category} (${ages})`
    cardRecipe.append(cardCategory)

    let cardGlass = document.createElement('div')
    cardGlass.id = 'glass'
    cardGlass.innerHTML = `Best served in: ${newCocktail.glass}`
    cardRecipe.append(cardGlass)

    let cardIngredients = document.createElement('div')
    cardIngredients.id = 'ingredients'
    cardIngredients.style.textAlign = 'left'
    cardIngredients.innerHTML = '<h5>Ingredients:</h5> <br>'
    let ingredientsList = document.createElement('div')
    let ingredients = document.createElement('ul')
    for (let i = 0; i < newCocktail.ingredients.length; i++) {
        let ingredient = document.createElement('li')
        console.log(newCocktail.ingredients[i])
        ingredient.innerHTML = `- ${newCocktail.ingredients[i]}`
        ingredients.append(ingredient)
        ingredientsList.append(ingredients)

    }
    cardIngredients.append(ingredientsList)
    cardRecipe.append(cardIngredients)

    let cardInstructions = document.createElement('div')
    cardInstructions.id = 'instructions'
    cardInstructions.innerHTML = `Instructions: ${newCocktail.instructions}`
    cardRecipeInstructions.append(cardInstructions)

    card.append(cardPic)
    card.append(cardRecipe)
    card.append(cardRecipeInstructions)
    return card

}

const showCards = () => {
    let userCards = document.getElementById('userCards')
    let showButton = document.getElementById('showButton')

    if (userCards.style.visibility == 'hidden') {
        userCards.style.visibility = 'visible'
        showButton.innerHTML = 'Hide'
    } else {
        userCards.style.visibility = 'hidden'
        showButton.innerHTML = 'Show'
    }

}




