import React from 'react';

import '../App.css';
import styles from '../styles';

const {
  Button,
  RecipeTable,
  RecipeTableRow,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
  Box,
} = styles;


function RecipeList(props) {

  const {
    recipes,
    selected,
    setSelected,
  } = props;

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
    </RecipeTableRow>;
  };

  const listItems = recipes.map((recipe) =>
    <RecipeListItem key={recipe.id}
                    id={recipe.id}
                    name={recipe.name}
                    description={recipe.description}/>
  );

  return <Box>
    <RecipeTable>
      {listItems}
    </RecipeTable>
  </Box>;
};

export default RecipeList;
