import React from "react";

import styles from '../styles'
import findRecipe from './findRecipe'
import recipesApi from './recipesApi';

const {
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  IngredientListItem,
  IngredientListBox,
  IngredientListContainer,
  RecipeDetailButtons,
  RecipeDetailButton,
} = styles;

const {
  deleteRecipe: deleteFromDb,
} = recipesApi;


function IngredientList(props) {
  if(!props.ingredients) {
    return null;
  }
  const list = props.ingredients.map((ingredient) =>
    <IngredientListItem key={ingredient.id}>{ingredient.name}</IngredientListItem>
  )
  return <IngredientListBox>
    <IngredientListContainer>
      {list}
    </IngredientListContainer>
  </IngredientListBox>
};


function RecipeDetail(props) {
  const {
    recipes,
    selected,
    setUpdating,
    recipeDbUpdated,
  } = props;

  async function deleteRecipe(id) {
    await deleteFromDb(id);
    recipeDbUpdated();
  }

  const recipe = findRecipe({recipes, id: selected});

  if(!recipe) {
    return null;
  }

  return <RecipeDetailContainer>
    <RecipeDetailName>{recipe.name}</RecipeDetailName>
    <RecipeDetailDescription>{recipe.description}</RecipeDetailDescription>
    <IngredientList ingredients={recipe.ingredients}/>
    <RecipeDetailButtons>
      <RecipeDetailButton href="#" onClick={() => setUpdating(recipe.id)}>Edit</RecipeDetailButton>
      <RecipeDetailButton href="#" onClick={() => deleteRecipe(recipe.id)}>Delete</RecipeDetailButton>
    </RecipeDetailButtons>

  </RecipeDetailContainer>;
};

export default RecipeDetail;
