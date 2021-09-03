import RecipeList from './RecipeList';

import styles from './styles.js'

const {
  AppWrapper,
  Title,
} = styles;

// Retrieve payload from Django backend
const payload = [
  {
    id: 1,
    name: 'Cabbage Soup',
    description: 'A soup made from cabbage',
    ingredients: [
      {
        id: 1,
        name: 'Cabbage'
      },
      {
        id: 2,
        name: 'water'
      },
    ],
  },
  {
    id: 2,
    name: 'Butter Pie',
    description: 'A pie made with butter',
    ingredients: [
      {
        id: 1,
        name: 'Pastry'
      },
      {
        id: 2,
        name: 'Potatoes'
      },
      {
        id: 3,
        name: 'Butter'
      },
    ],
  },
  {
    id: 3,
    name: 'Prawn salad',
    description: 'A salad made of prawns',
    ingredients: [
      {
        id: 1,
        name: 'Prawns'
      },
      {
        id: 2,
        name: 'Marie Rose sauce'
      }
    ],
  }
];


function App() {

  return (
    <AppWrapper className="App">
      <Title>Recipes</Title>
      <RecipeList recipes={payload}/>
    </AppWrapper>
  );
}

export default App;
