import React,  { useState, useEffect, } from "react";

import styles from '../styles';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';

import recipesApi from "./recipesApi";


const {
  ComponentWrapper,
  Button,
  Title,
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
        console.log(`GET recipes response = ${JSON.stringify(response)}`);

        if(!cancelled) {
          setSelected(false);
          setRecipes(response.data);
        }
      } catch(e) {
        if(!cancelled) {
          // TODO Handle error state
          console.log(`GET recipes error: ${JSON.stringify(e)} ${
            cancelled? 'after cancellation':''
          }`);
        }
      }

      if(!cancelled) {
        setUpdating(false);
        setRefreshing(false);
      }

      console.log(`GET recipes DONE ${cancelled? '(after cancellation)':''}`);
    }

    getRecipes();

    return (() => {cancelled = true;});
  }, [refreshing]);

  console.log(`RecipeComponent selected: ${selected} updating: ${updating} refreshing: ${refreshing}`);

  return (
    <ComponentWrapper>
      <Title>Recipes</Title>
      <Button href="#" onClick={(e) => setUpdating(true)}>Add recipe</Button>
      <RecipeList recipes={recipes} setSelected={setSelected} setUpdating={setUpdating} recipeDbUpdated={recipeDbUpdated}/>
      {
        updating &&
        <RecipeForm recipes={recipes} updating={updating} recipeDbUpdated={recipeDbUpdated} setUpdating={setUpdating}/>
      }
      {
        selected && !updating &&
        <RecipeDetail recipes={recipes} selected={selected}/>
      }
    </ComponentWrapper>
  );
}

export default RecipeComponent;
