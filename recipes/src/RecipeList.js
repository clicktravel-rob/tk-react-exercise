import styled from 'styled-components';


const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const RecipeTable = styled.table`
  border-radius: 3px;
  border: 2px solid #8d64ed;
  width: 100%;
  margin: 20px auto;
  table-layout: fixed;
  border-collapse: collapse;
`

const RecipeTableRow = styled.tr`
  border: 2px solid #a5bce7;
`;

const RecipeTableLabel = styled.th`
  border: 2px solid lavender;
  background: aliceblue;
  border-collapse: collapse;
`;

const RecipeTableItem = styled.td`
  border: 2px solid lavender;
  border-collapse: collapse;
  padding: 2px;
  text-align: center;
`;


function RecipeListItem(props) {
  return <RecipeTableRow>
    <RecipeTableItem>
      <Button as="a" href="#">{props.name}</Button>
    </RecipeTableItem>
    <RecipeTableItem>{props.description}</RecipeTableItem>
  </RecipeTableRow>;
};


function RecipeList(props) {
  const listItems = props.recipes.map((recipe) =>
    <RecipeListItem key={recipe.id} name={recipe.name} description={recipe.description}/>
  );

  return <RecipeTable>
    <thead>
      <RecipeTableRow>
        <RecipeTableLabel>Name</RecipeTableLabel>
        <RecipeTableLabel>Description</RecipeTableLabel>
      </RecipeTableRow>
    </thead>
    <tbody>
      {listItems}
    </tbody>
  </RecipeTable>;
};

export default RecipeList;
