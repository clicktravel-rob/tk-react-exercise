import React from "react";

import styles from '../styles'

const {
  IngredientListItem,
  IngredientListBox,
  IngredientListContainer,
} = styles;

function IngredientList(props) {
  if(!props.ingredients) {
    return null;
  }
  const list = props.ingredients.map((ingredient) =>
    <IngredientListItem key={ingredient.id}>{ingredient.name}</IngredientListItem>
  )
  return <IngredientListBox>
    <IngredientListContainer>
      {list}
    </IngredientListContainer>
  </IngredientListBox>
};

export default IngredientList;
