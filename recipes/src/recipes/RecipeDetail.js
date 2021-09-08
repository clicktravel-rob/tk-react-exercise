import React from "react";

import styles from '../styles'
import findRecipe from './findRecipe'

const {
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  IngredientListItem,
  IngredientListBox,
  IngredientListContainer,
} = styles;


function IngredientList(props) {
  if(!props.ingredients) {
    console.log('no ingredients')
    return null;
  }
  console.log(`ingredients: ${JSON.stringify(props.ingredients)}`)
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
  } = props;

  const recipe = findRecipe({recipes, id: selected});

  if(!recipe) {
    console.log('RecipeDetail - no recipe');
    return null;
  }

  return <RecipeDetailContainer>
    <RecipeDetailName>{recipe.name}</RecipeDetailName>
    <RecipeDetailDescription>{recipe.description}</RecipeDetailDescription>
    <IngredientList ingredients={recipe.ingredients}/>
  </RecipeDetailContainer>;
};

export default RecipeDetail;
