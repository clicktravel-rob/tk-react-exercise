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
  getRecipes: getRecipesFromDb,
} = recipesApi;


function RecipeComponent() {

  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const recipeDbUpdated = () => {
    setUpdating(false);
    setRefreshing(true);
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
  }, [refreshing]);

  return (
    <div>
      <AddButton href="#" onClick={(e) => setUpdating(true)}>Add recipe</AddButton>
      <Container>
        {
          updating &&
          <RecipeForm recipes={recipes} updating={updating} setUpdating={setUpdating} recipeDbUpdated={recipeDbUpdated}/>
        }
        {
          selected && !updating &&
          <RecipeDetail recipes={recipes} selected={selected} setUpdating={setUpdating} recipeDbUpdated={recipeDbUpdated}/>
        }
        <RecipeList recipes={recipes} selected={selected} setSelected={setSelected}/>
      </Container>
    </div>
  );
}

export default RecipeComponent;
