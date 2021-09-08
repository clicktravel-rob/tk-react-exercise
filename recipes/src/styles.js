import styled from 'styled-components';

import Creatable from 'react-select/creatable';

const StyledApp = styled.section`
  padding: 4em;
  background: ivory;
`;

const ComponentWrapper = styled.section`
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
  border: 2px solid thistle;
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-flow: column wrap;
`;

const RecipeTableRow = styled.div`
    border: ${props => (props.highlight? '1px solid lightsteelblue' : '1px hidden gainsboro')
  };
  display: flex;
  flex-direction: row;
`;

const RecipeTableItem = styled.div`
  border: 1px solid thistle;
  border-collapse: collapse;
  padding: 2px;
  text-align: left;
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
  text-align: left;
`;

const RecipeDetailName = styled.h2`
  text-align: left;
  color: mediumslateblue;
`;

const RecipeDetailDescription = styled.p`
`;

const IngredientListBox = styled.div`
  text-align: left;
`;

const IngredientListContainer = styled.ul`
  list-style-type: none;
`;

const IngredientListItem = styled.li`
`;

const IngredientListSelect = styled(Creatable)`
  flex: 0 0  200px
`;


const styles = {
  StyledApp,
  ComponentWrapper,
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
  IngredientListSelect,
};

export default styles;
