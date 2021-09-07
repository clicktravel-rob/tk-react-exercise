import axios from 'axios';
import { useState, useEffect } from 'react';


const RECIPE_LIST_URL = '/api/recipe/recipes/';


function useRecipeDb() {

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(undefined);

  function reloadRecipes() {
    console.log('GET recipes: LOADING');
    setIsLoading(true);
  }

  useEffect(() => {
    let cancelled = false;

    const getRecipes = async () => {
      setIsError(undefined);

      try {
        const response = await axios.get(RECIPE_LIST_URL);
        console.log(`GET recipes response = ${JSON.stringify(response)}`);
        setRecipes(response.data);
      } catch(e) {
        console.log(`GET recipes error: ${JSON.stringify(e)} ${
          cancelled? 'after cancellation':''
        }`);
        if(!cancelled) {
          setIsError(e);
        }
      }

      console.log(`GET recipes DONE ${cancelled? '(after cancellation)':''}`);

      if(!cancelled) {
        setIsLoading(false);
      }
    }

    getRecipes();

    return (() => {cancelled = true;});
  }, [isLoading]);

  return [{recipes, isLoading, isError}, reloadRecipes];
}


export default useRecipeDb
