import RecipeList from './RecipeList';

import styles from './styles.js'
import React from "react";

const {
  AppWrapper,
  Button,
  Title,
} = styles;


function App() {

  return (
    <AppWrapper className="App">
      <Title>Recipes</Title>
      <Button href="#" onClick={() => console.log('Add button clicked')}>Add recipe</Button>
      <RecipeList recipes=""/>
    </AppWrapper>
  );
}

export default App;
