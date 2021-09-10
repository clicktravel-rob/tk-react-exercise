import React,  { useState, useEffect, } from "react";

import styles from '../styles';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';

import recipesApi from "./recipesApi";


const {
  Container,
  AddButton,
} = styles;

const {
  getRecipes: defaultGetRecipesFromDb,
  deleteRecipe: defaultDeleteRecipeFromDb,
  addOrUpdateRecipe: defaultAddOrUpdateRecipeInDb,
} = recipesApi;


function RecipeComponent(props) {
  const {
    getRecipesFromDb = defaultGetRecipesFromDb,
    deleteRecipeFromDb = defaultDeleteRecipeFromDb,
    addOrUpdateRecipeInDb = defaultAddOrUpdateRecipeInDb,
  } = props;

  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const recipeDbUpdated = () => {
    setUpdating(false);
    setRefreshing(true);
  }

  async function deleteRecipe(id) {
    await deleteRecipeFromDb(id);
    recipeDbUpdated();
  }

  async function addOrUpdateRecipe(recipe) {
    await addOrUpdateRecipeInDb(recipe);
    recipeDbUpdated();
  }

  useEffect(() => {
    let cancelled = false;

    const getRecipes = async () => {
      try {
        const response = await getRecipesFromDb();

        if(!cancelled) {
          setSelected(false);
          setRecipes(response.data);
        }
      } catch(e) {
        if(!cancelled) {
          // TODO Handle error state
          alert(`GET recipes error: ${JSON.stringify(e)} ${
            cancelled? 'after cancellation':''
          }`);
        }
      }

      if(!cancelled) {
        setUpdating(false);
        setRefreshing(false);
      }
    }

    getRecipes();

    return (() => {cancelled = true;});
  }, [
    refreshing,
    getRecipesFromDb,
    deleteRecipeFromDb,
    addOrUpdateRecipeInDb,
  ]);

  return (
    <div>
      <AddButton href="#" onClick={(e) => setUpdating(true)}>Add recipe</AddButton>
      <Container>
        {
          updating &&
          <RecipeForm recipes={recipes} updating={updating} setUpdating={setUpdating} addOrUpdateRecipe={addOrUpdateRecipe}/>
        }
        {
          selected && !updating &&
          <RecipeDetail recipes={recipes} selected={selected} setUpdating={setUpdating} deleteRecipe={deleteRecipe}/>
        }
        <RecipeList recipes={recipes} selected={selected} setSelected={setSelected}/>
      </Container>
    </div>
  );
}

export default RecipeComponent;
