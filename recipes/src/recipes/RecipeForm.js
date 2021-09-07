import React, { useState } from "react";
import Creatable from 'react-select/creatable';

import styles from "../styles"
import axios from "axios";
import useRecipeDb from "./useRecipeApi";

const {
  ComponentWrapper
} = styles;

const RECIPE_LIST_URL = '/api/recipe/recipes/';

function RecipeForm(props) {
  const {
    recipe: {
      id,
      name: initialName = "",
      description: initialDescription = "",
      ingredients: initialIngredients = [],
    } = {},
  } = props;

  const isUpdating =  (id !== undefined) && (id !== null);

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [ingredients, setIngredients] = useState(initialIngredients);

  const [, reloadRecipes] = useRecipeDb();

  async function postRecipe(evt) {
    evt.preventDefault();

    const recipeUpdate = {
      name,
      description,
      ingredients,
    };

    alert(`Submitting Recipe ${JSON.stringify(recipeUpdate)}`)

    const result = await axios.post(RECIPE_LIST_URL, recipeUpdate);

    console.log(`POST recipes result = ${JSON.stringify(result)}`)

    reloadRecipes();
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

  const title = isUpdating? 'Edit Recipe' : 'Add Recipe';

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
            <textarea type="text" rows="6" value={description} onChange={e => setDescription(e.target.value)}/>
          </label>
        </li>
        <li>
          <label>
            Ingredients:
            <Creatable options={ingredientItems} isMulti onChange={onIngredientsChange}/>
          </label>
        </li>
        <li>
          <input type="submit" value="Submit" />
        </li>
      </ul>
    </form>
  </ComponentWrapper>
}

export default RecipeForm;
