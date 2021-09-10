import React from "react";
import RecipeComponent from './recipes/RecipeComponent';
import styles from './styles';

const {
  Global,
  StyledApp,
  Title,
} = styles;

function App() {
  return (
    <StyledApp className="App">
      <Global/>
      <Title>Recipes Database</Title>
      <RecipeComponent/>
    </StyledApp>
  );
}

export default App;
