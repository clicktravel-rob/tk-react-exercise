import React from 'react';

import '../App.css';
import styles from '../styles'

const {
  Button,
  RecipeTable,
  RecipeTableRow,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
  RecipeTableButtonItem,
  ComponentWrapper,
} = styles;


function RecipeList(props) {

  const {
    recipes,
    setSelected,
    setUpdating,
  } = props;

  console.log(`RecipeList recipes: ${JSON.stringify(recipes)}`)

  function RecipeListItem(props) {
    return <RecipeTableRow>
      <RecipeTableNameItem>
        <Button as="a" href="#" onClick={
          () => setSelected(props.id)
        }>{props.name}</Button>
      </RecipeTableNameItem>
      <RecipeTableDescriptionItem>
        {props.description}
      </RecipeTableDescriptionItem>
      <RecipeTableButtonItem>
        <Button href="#" onClick={() => setUpdating(props.id)}>Edit Recipe</Button>
      </RecipeTableButtonItem>
      <RecipeTableButtonItem>
        <Button href="#" onClick={() => console.log('Delete button clicked')}>Delete Recipe</Button>
      </RecipeTableButtonItem>
    </RecipeTableRow>;
  };

  const listItems = recipes.map((recipe) =>
    <RecipeListItem key={recipe.id} id={recipe.id} name={recipe.name} description={recipe.description}/>
  );

  return <ComponentWrapper>
    <RecipeTable>
      {listItems}
    </RecipeTable>
  </ComponentWrapper>;
};

export default RecipeList;
