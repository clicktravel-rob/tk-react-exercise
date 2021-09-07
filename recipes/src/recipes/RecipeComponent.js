import React from "react";

import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import styles from '../styles.js';

const {
  ComponentWrapper,
  Button,
  Title,
} = styles;


function RecipeComponent() {
  return (
    <ComponentWrapper>
      <Title>Recipes</Title>
      <Button href="#" onClick={() => console.log('Add button clicked')}>Add recipe</Button>
      <RecipeList recipes=""/>
      <RecipeForm recipe=""/>
    </ComponentWrapper>
  );
}

export default RecipeComponent;
