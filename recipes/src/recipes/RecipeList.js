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

  console.log(`RecipeList props: ${JSON.stringify(props)}`)

  const {
    recipes,
    selected,
    setSelected,
    setUpdating,
    recipeDbUpdated
  } = props;

  async function deleteRecipe(id) {
    await deleteFromDb(id);
    recipeDbUpdated();
  }

  function RecipeListItem(props) {
    const isSelected = (props.id === selected);

    const updateSelection = () => setSelected( isSelected? false : props.id );

    return <RecipeTableRow highlight={isSelected}>
      <RecipeTableNameItem>
        <Button as="a" href="#" onClick={
          () => updateSelection()
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
    <RecipeListItem key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    description={recipe.description}/>
  );

  return <ComponentWrapper>
    <RecipeTable>
      {listItems}
    </RecipeTable>
  </ComponentWrapper>;
};

export default RecipeList;
