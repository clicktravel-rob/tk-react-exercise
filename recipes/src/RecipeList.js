import axios from 'axios';
import React, { useState, useEffect } from 'react';import './App.css';
import styles from './styles.js'

const {
  Button,
  RecipeTable,
  RecipeTableRow,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
  RecipeTableButtonItem,
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  IngredientListBox,
  IngredientListItem,
  IngredientListContainer,
  SectionWrapper,
} = styles;


const RECIPE_LIST_URL = '/api/recipe/recipes/';


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


function RecipeList(props) {

  const [selected, setSelected] = useState(undefined);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const result = await axios.get(RECIPE_LIST_URL);

      console.log(`result = ${JSON.stringify(result)}`)

      setSelected(undefined);
      setRecipes(result.data);
    }

    fetchRecipes();
  }, []);

  function RecipeDetail(props) {
    console.log(`selected: ${JSON.stringify(selected)}`)

    if(!recipes || (selected === undefined)) {
      return <RecipeDetailContainer/>;
    }

    const recipe = recipes.find(e => (e.id === selected));

    console.log(`recipe: ${JSON.stringify(recipe)}`)

    return <RecipeDetailContainer>
      <RecipeDetailName>{recipe.name}</RecipeDetailName>
      <RecipeDetailDescription>{recipe.description}</RecipeDetailDescription>
      <IngredientList ingredients={recipe.ingredients}/>
    </RecipeDetailContainer>;
  };

  function RecipeListItem(props) {
    console.log(`RecipeListItem [props: ${JSON.stringify(props)}]`)
    return <RecipeTableRow>
      <RecipeTableNameItem>
        <Button as="a" href="#" onClick={() => setSelected(props.id)}>{props.name}</Button>
      </RecipeTableNameItem>
      <RecipeTableDescriptionItem>
        {props.description}
      </RecipeTableDescriptionItem>
      <RecipeTableButtonItem>
        <Button href="#" onClick={() => console.log('Edit button clicked')}>Edit Recipe</Button>
      </RecipeTableButtonItem>
      <RecipeTableButtonItem>
        <Button href="#" onClick={() => console.log('Delete button clicked')}>Delete Recipe</Button>
      </RecipeTableButtonItem>
    </RecipeTableRow>;
  };

  const listItems = recipes.map((recipe) =>
    <RecipeListItem key={recipe.id} id={recipe.id} name={recipe.name} description={recipe.description}/>
  );

  return <SectionWrapper>
    <RecipeTable>
      {listItems}
    </RecipeTable>
    <RecipeDetail recipes={recipes} selected=""/>
  </SectionWrapper>;
};

export default RecipeList;
