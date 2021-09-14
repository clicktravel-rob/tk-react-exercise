import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';

import RecipeList from './RecipeList';
import testData from '../../data/testData';

const { recipe1, recipe2, recipe3 } = testData;

const recipes = [ recipe1, recipe2, recipe3 ];

describe('RecipeList', () => {

  test('it should initialise the list with the recipes supplied',() => {
    const selected = false;
    const mockSetSelected = jest.fn();

    const component = render(<RecipeList recipes={recipes}
                                         selected={selected}
                                         setSelected={mockSetSelected}/>);

    recipes.map(({id, name, description, ingredients}) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    expect(mockSetSelected).not.toHaveBeenCalled();
  });

  test('it should pass the recipe id setSelected() when a recipe name is clicked',() => {
    const selected = false;
    const mockSetSelected = jest.fn();

    const component = render(<RecipeList recipes={recipes}
                                         selected={selected}
                                         setSelected={mockSetSelected}/>);

    const selectedRecipe = recipe2;

    const recipeLink = screen.getByText(selectedRecipe.name);
    expect(recipeLink).toBeInTheDocument();
    fireEvent.click(recipeLink);

    expect(mockSetSelected).toHaveBeenCalledWith(recipe2.id);
  });

  test('it should call setSelected(false) when the selected recipe is clicked',() => {
    const selected = 2;
    const mockSetSelected = jest.fn();

    const component = render(<RecipeList recipes={recipes}
                                         selected={selected}
                                         setSelected={mockSetSelected}/>);

    const selectedRecipe = recipe2;

    const recipeLink = screen.getByText(selectedRecipe.name);
    expect(recipeLink).toBeInTheDocument();
    fireEvent.click(recipeLink);

    expect(mockSetSelected).toHaveBeenCalledWith(false);
  });

});
