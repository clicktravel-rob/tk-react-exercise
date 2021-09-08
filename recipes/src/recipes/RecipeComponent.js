import React,  { useState, useEffect, } from "react";

import styles from '../styles';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';
import axios from "axios";


const {
  ComponentWrapper,
  Button,
  Title,
} = styles;


const RECIPE_LIST_URL = '/api/recipe/recipes/';


function RecipeComponent() {

  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    let cancelled = false;

    const getRecipes = async () => {
      try {
        const response = await axios.get(RECIPE_LIST_URL);
        console.log(`GET recipes response = ${JSON.stringify(response)}`);

        if(!cancelled) {
          setSelected(false);
          setUpdating(false);
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

      console.log(`GET recipes DONE ${cancelled? '(after cancellation)':''}`);
    }

    getRecipes();

    return (() => {cancelled = true;});
  }, [refreshing]);

  console.log(`RecipeComponent selected: ${selected} updating: ${updating}`);

  return (
    <ComponentWrapper>
      <Title>Recipes</Title>
      <Button href="#" onClick={(e) => setUpdating(true)}>Add recipe</Button>
      <RecipeList recipes={recipes} setSelected={setSelected} setUpdating={setUpdating}/>
      {
        updating &&
        <RecipeForm recipes={recipes} updating={updating} setUpdating={setUpdating} setRefreshing={setRefreshing}/>
      }
      {
        selected && !updating &&
        <RecipeDetail recipes={recipes} selected={selected}/>
      }
    </ComponentWrapper>
  );
}

export default RecipeComponent;
