import RecipeList from './RecipeList';

import styles from './styles.js'

const {
  AppWrapper,
  Title,
} = styles;


function App() {

  return (
    <AppWrapper className="App">
      <Title>Recipes</Title>
      <RecipeList recipes=""/>
    </AppWrapper>
  );
}

export default App;
