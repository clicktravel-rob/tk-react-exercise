const findRecipe = ({recipes, id}) => (
  recipes
  ? recipes.find(item => (item.id === id))
  : undefined);

export default findRecipe;
