import { render, fireEvent, screen } from '@testing-library/react';

import RecipeListItem from './RecipeListItem';
import testData from '../../data/testData';
import RecipeList from "./RecipeList";

const { recipe2 : recipe } = testData;

describe('RecipeListItem', () => {

  test('it should render the recipe\'s name and description',() => {
    render(<RecipeListItem key={recipe.id}
                                             id={recipe.id}
                                             name={recipe.name}
                                             description={recipe.description}/>);
    expect(screen.getByText(recipe.name)).toBeInTheDocument();
    expect(screen.getByText(recipe.description)).toBeInTheDocument();
  });
});
