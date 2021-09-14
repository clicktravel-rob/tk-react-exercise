import axios from "axios";

const RECIPE_LIST_URL = '/api/recipe/recipes/';


const getRecipes = async () => axios.get(RECIPE_LIST_URL);

const addRecipe = async (recipe) => axios.post(RECIPE_LIST_URL, recipe);

const updateRecipe = async (recipe) => {
  const { id } = recipe;
  return axios.put(`${RECIPE_LIST_URL}${id}/`, recipe);
}

const addOrUpdateRecipe = async (recipe) => {
  const {
    id,
  } = recipe;

  const isExistingRecipe =  (id !== undefined) && (id !== null);

  return (
    isExistingRecipe
    ? updateRecipe(recipe)
    : addRecipe(recipe));
}

const deleteRecipe = async (id) => axios.delete(`${RECIPE_LIST_URL}${id}/`);


const recipesApi = {
  getRecipes,
  addRecipe,
  updateRecipe,
  addOrUpdateRecipe,
  deleteRecipe,
};

export default recipesApi;
