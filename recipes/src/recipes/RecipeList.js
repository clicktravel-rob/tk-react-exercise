import React from 'react';

import styles from '../styles';
import RecipeListItem from './RecipeListItem';

const {
  RecipeTable,
  Box,
} = styles;


function RecipeList(props) {

  const {
    recipes,
  } = props;

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
