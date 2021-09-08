import React, { useState } from 'react';
import axios from 'axios';
import Creatable from 'react-select/creatable';

import styles from '../styles';
import findRecipe from "./findRecipe";

const {
  ComponentWrapper
} = styles;

const RECIPE_LIST_URL = '/api/recipe/recipes/';

function RecipeForm(props) {
  console.log('RecipeForm rendering')
  const {
    recipes,
    updating,
    setUpdating,
    setRefreshing
  } = props;

  const recipe = findRecipe({recipes, id: updating});
  console.log(`recipe for form: ${JSON.stringify(recipe)}`)

  const {
    id,
    name: initialName,
    description: initialDescription,
    ingredients: initialIngredients = [],
  } = recipe || {};

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [ingredients, setIngredients] = useState(initialIngredients);

  console.log(`recipe state - name: ${name} description: ${description} ingredients: ${JSON.stringify(ingredients)}`)

  const isExistingRecipe =  (id !== undefined) && (id !== null);

  if(updating === false) {
    return null;
  }

  async function postRecipe(evt) {
    evt.preventDefault();

    const recipeUpdate = {
      name,
      description,
      ingredients,
    };

    console.log(`Submitting ${isExistingRecipe? 'existing' : 'new'} recipe ${JSON.stringify(recipeUpdate)}`)

    const result = (isExistingRecipe
      ? await axios.put(`${RECIPE_LIST_URL}${id}/`, recipeUpdate)
      : await axios.post(RECIPE_LIST_URL, recipeUpdate));

    console.log(`update recipes result = ${JSON.stringify(result)}`)

    setUpdating(false);
    setRefreshing(true);
  }

  function onIngredientsChange(newValue, actionMeta) {
    console.log(`Value Changed:
      newValue: ${JSON.stringify(newValue)}
      action: ${JSON.stringify(actionMeta.action)}`);

    const replacementIngredients = newValue.map(item => ({
      id: (item.label === item.value)? undefined : item.value,
      name: item.label,
    }));

    console.log(`Replacement ingredients:
      ${JSON.stringify(replacementIngredients)}`);

    setIngredients(replacementIngredients);
  };

  const title = isExistingRecipe? 'Edit Recipe' : 'Add Recipe';

  const ingredientItems = ingredients.map(ingredient => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  return <ComponentWrapper>
    <h2>{title}</h2>
    <form onSubmit={postRecipe}>
      <ul>
        <li>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
          </label>
        </li>
        <li>
          <label>
            Description:
            <textarea rows="6" value={description} onChange={e => setDescription(e.target.value)}/>
          </label>
        </li>
        <li>
          <label>
            Ingredients:
            <Creatable isMulti options={ingredientItems} defaultValue={ingredientItems} onChange={onIngredientsChange}/>
          </label>
        </li>
        <li>
          <input type="submit" value="Submit" />
          <input type="button" value="Cancel" onClick={() => setUpdating(false)}/>
        </li>
      </ul>
    </form>
  </ComponentWrapper>
}

export default RecipeForm;
