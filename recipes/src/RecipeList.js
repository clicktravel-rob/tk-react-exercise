import styles from './styles.js'

const {
  Button,
  RecipeTable,
  RecipeTableRow,
  RecipeTableNameLabel,
  RecipeTableDescriptionLabel,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  IngredientListBox,
  IngredientListItem,
  IngredientListContainer,
  SectionWrapper,
} = styles;


function IngredientList(props) {
  if(!props.ingredients) {
    console.log('no ingredients')
    return <IngredientListBox/>;
  }
  console.log(`ingredients: ${JSON.stringify(props.ingredients)}`)
  const list = props.ingredients.map((ingredient) =>
    <IngredientListItem key={ingredient.id}>{ingredient.name}</IngredientListItem>
  )
  return <IngredientListBox>
    <IngredientListContainer>
      {list}
    </IngredientListContainer>
  </IngredientListBox>
};


function RecipeDetail(props) {
  const selected = props.selected
    ? parseInt(props.selected)
    : undefined;
  console.log(`selected: ${JSON.stringify(selected)}`)

  const recipe = props.recipes.find(e => (e.id === selected));
  console.log(`recipe: ${JSON.stringify(recipe)}`)

  return recipe
    ?<RecipeDetailContainer>
      <RecipeDetailName>{recipe.name}</RecipeDetailName>
      <RecipeDetailDescription>{recipe.description}</RecipeDetailDescription>
      <IngredientList ingredients={recipe.ingredients}/>
    </RecipeDetailContainer>
    : <RecipeDetailContainer/>
};


function RecipeListItem(props) {
  return <RecipeTableRow>
    <RecipeTableNameItem>
      <Button as="a" href="#" >{props.name}</Button>
    </RecipeTableNameItem>
    <RecipeTableDescriptionItem>{props.description}</RecipeTableDescriptionItem>
  </RecipeTableRow>;
};


function RecipeList(props) {
  const listItems = props.recipes.map((recipe) =>
    <RecipeListItem key={recipe.id} name={recipe.name} description={recipe.description}/>
  );

  return <SectionWrapper>
    <RecipeTable>
      <RecipeTableRow>
        <RecipeTableNameLabel>Name</RecipeTableNameLabel>
        <RecipeTableDescriptionLabel>Description</RecipeTableDescriptionLabel>
      </RecipeTableRow>
      {listItems}
    </RecipeTable>
    <RecipeDetail recipes={props.recipes} selected="2"/>
  </SectionWrapper>;
};

export default RecipeList;
