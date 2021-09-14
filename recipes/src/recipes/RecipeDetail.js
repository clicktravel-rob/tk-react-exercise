import React from "react";

import styles from '../styles'
import IngredientList from './IngredientList'
import findRecipe from './findRecipe'

const {
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  RecipeDetailButtons,
  RecipeDetailButton,
} = styles;


function RecipeDetail(props) {
  const {
    recipes,
    selected,
    setUpdating,
    deleteRecipe,
  } = props;

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
