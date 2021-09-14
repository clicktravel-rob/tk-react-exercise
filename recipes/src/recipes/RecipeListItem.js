import React from 'react';

import styles from '../styles';

const {
  Button,
  RecipeTableRow,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
} = styles;


function RecipeListItem(props) {

  const {
    selected,
    setSelected,
  } = props;

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
