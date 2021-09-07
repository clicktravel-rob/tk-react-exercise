import React from "react";
import RecipeComponent from './recipes/RecipeComponent';
import styles from './styles';

const {
  StyledApp
} = styles;

function App() {
  return (
    <StyledApp className="App">
      <RecipeComponent/>
    </StyledApp>
  );
}

export default App;
