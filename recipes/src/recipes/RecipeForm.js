import React, { useState } from 'react';
import Creatable from 'react-select/creatable';

import styles from '../styles';
import findRecipe from "./findRecipe";


const {
  Box,
  FormTitle,
  StyledForm,
  FormContent,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  StyledSubmitButton,
  StyledCancelButton,
} = styles;

function RecipeForm(props) {
  const {
    recipes,
    updating,
    setUpdating,
    addOrUpdateRecipe,
  } = props;

  const recipe = findRecipe({recipes, id: updating});

  const {
    id,
    name: initialName = '',
    description: initialDescription = '',
    ingredients: initialIngredients = [],
  } = recipe || {};

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [ingredients, setIngredients] = useState(initialIngredients);

  if(updating === false) {
    return null;
  }

  async function postRecipe(evt) {
    evt.preventDefault();

    const recipeUpdate = {
      id,
      name,
      description,
      ingredients,
    };

    addOrUpdateRecipe(recipeUpdate);
  }

  function onIngredientsChange(newValue, actionMeta) {
    const replacementIngredients = newValue.map(item => ({
      id: (item.label === item.value)? undefined : item.value,
      name: item.label,
    }));

    setIngredients(replacementIngredients);
  };

  const isExistingRecipe =  (id !== undefined) && (id !== null);
  const title = isExistingRecipe? 'Edit Recipe' : 'Add Recipe';

  const ingredientItems = ingredients.map(ingredient => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  return <Box>
    <FormTitle>{title}</FormTitle>
    <StyledForm role="form" name="recipe-form" onSubmit={postRecipe}>
      <FormContent>
        <li>
          <StyledLabel htmlFor="name">Name:</StyledLabel>
        </li>
        <li>
          <StyledInput id="name" type="text" value={name} onChange={e => setName(e.target.value)}/>
        </li>
        <li>
          <StyledLabel htmlFor="description">Description:</StyledLabel>
        </li>
        <li>
          <StyledTextArea id="description" rows="6" value={description}
                          onChange={e => setDescription(e.target.value)}/>
        </li>
        <li>
          <StyledLabel htmlFor="ingredients">Ingredients:</StyledLabel>
        </li>
        <li data-testid="ingredients-select-box">
          <Creatable isMulti role="select" aria-label="ingredients"
                     id="ingredients" name="ingredients" inputId="ingredients"
                     placeholder="Select ingredients..."
                     options={ingredientItems} defaultValue={ingredientItems}
                     onChange={onIngredientsChange}/>
        </li>
        <li>
          <StyledSubmitButton type="submit" value="Submit" />
          <StyledCancelButton type="button" value="Cancel" onClick={() => setUpdating(false)}/>
        </li>
      </FormContent>
    </StyledForm>
  </Box>
}

export default RecipeForm;
