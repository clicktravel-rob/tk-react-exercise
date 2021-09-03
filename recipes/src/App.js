import './App.css';
import styled from 'styled-components';
import RecipeList from './RecipeList';


const AppWrapper = styled.section`
  padding: 4em;
  background: ivory;
`;

const SectionWrapper = styled.section`
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: teal;
`;


// Retrieve payload from Django backend
const payload = [
  {
    id: 1,
    name: 'Cabbage Soup',
    description: 'A soup made from cabbage',
  },
  {
    id: 2,
    name: 'Butter Pie',
    description: 'A pie made with butter',
  },
  {
    id: 3,
    name: 'Prawn salad',
    description: 'A salad made of prawns',
  }
];


function App() {
  return (
    <AppWrapper className="App">
      <Title>Recipes</Title>
      <SectionWrapper>
        <RecipeList recipes={payload}/>
      </SectionWrapper>
      <SectionWrapper>
        <h2>{}</h2>
      </SectionWrapper>

    </AppWrapper>
  );
}

export default App;
