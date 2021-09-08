import React from 'react';

import '../App.css';
import styles from '../styles';
import recipesApi from './recipesApi';

const {
  deleteRecipe: deleteFromDb,
} = recipesApi;

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
    recipeDbUpdated
  } = props;

  console.log(`RecipeList recipes: ${JSON.stringify(recipes)}`)

  async function deleteRecipe(id) {
    console.log(`deleting recipe ${id}`);
    await deleteFromDb(id);
    recipeDbUpdated();
  }

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
        <Button href="#" onClick={() => deleteRecipe(props.id)}>Delete Recipe</Button>
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
