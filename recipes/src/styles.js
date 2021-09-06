import styled from 'styled-components';

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

const Button = styled.button`
  display: inline-block;
  color: royalblue;
  font-size: 1em;
  padding: 0.25em 0.25em;
  display: block;
`;

const RecipeTable = styled.div`
  border-radius: 3px;
  border: 2px solid #8d64ed;
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-flow: column wrap;
`;

const RecipeTableRow = styled.div`
  border: 2px solid #a5bce7;
  display: flex;
  flex-direction: row;
`;

const RecipeTableItem = styled.div`
  border: 2px solid lavender;
  border-collapse: collapse;
  padding: 2px;
  text-align: center;
`;

const RecipeTableNameItem = styled(RecipeTableItem)`
  flex: 0 0  200px
`;

const RecipeTableDescriptionItem = styled(RecipeTableItem)`
  flex: 2 1 auto
`;

const RecipeTableButtonItem = styled(RecipeTableItem)`
  flex: 0 0  auto
`;

const RecipeDetailContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const RecipeDetailName = styled.h2`
  text-align: center;
  color: mediumslateblue;
`;

const RecipeDetailDescription = styled.p`
  text-align: center;
`;

const IngredientListBox = styled.div`
  text-align: center;
`

const IngredientListContainer = styled.ol`
  list-style-type: none;
`

const IngredientListItem = styled.li`
`

const styles = {
  AppWrapper,
  SectionWrapper,
  Title,
  Button,
  RecipeTable,
  RecipeTableRow,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
  RecipeTableButtonItem,
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  IngredientListBox,
  IngredientListItem,
  IngredientListContainer,
};

export default styles;
