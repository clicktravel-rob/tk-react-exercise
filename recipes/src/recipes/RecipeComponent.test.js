import React from "react";
import { render, fireEvent, screen, act, waitForElementToBeRemoved } from '@testing-library/react';

import RecipeComponent from './RecipeComponent';
import testData from '../../data/testData';


const { recipe1, recipe2, recipe3 } = testData;

const recipes = [ recipe1, recipe2, recipe3 ];


describe('RecipeComponent', () => {

  test('it should initialise the list with the recipes supplied',async () => {
    const promise = Promise.resolve({
      data: recipes,
    });
    const getRecipesFromDb = jest.fn(async () => promise);
    const deleteRecipeFromDb = jest.fn();
    const addOrUpdateRecipeInDb = jest.fn();

    render(<RecipeComponent getRecipesFromDb={getRecipesFromDb}
                                              deleteRecipeFromDb={deleteRecipeFromDb}
                                              addOrUpdateRecipeInDb={addOrUpdateRecipeInDb} />);
    // Wait for component to load recipes from backend
    await act(() => promise);

    recipes.map(({id, name, description, ingredients}) => {
      expect(screen.getByText(name)).not.toBeNull();
      expect(screen.getByText(description)).not.toBeNull();
    });

    expect(getRecipesFromDb).toHaveBeenCalled();
    expect(deleteRecipeFromDb).not.toHaveBeenCalled();
    expect(addOrUpdateRecipeInDb).not.toHaveBeenCalled();
  });

  test('it should show the recipe details when a recipe is selected',async () => {
    const promise = Promise.resolve({
      data: recipes,
    });
    const getRecipesFromDb = jest.fn(async () => promise);
    const deleteRecipeFromDb = jest.fn();
    const addOrUpdateRecipeInDb = jest.fn();

    render(<RecipeComponent getRecipesFromDb={getRecipesFromDb}
                            deleteRecipeFromDb={deleteRecipeFromDb}
                            addOrUpdateRecipeInDb={addOrUpdateRecipeInDb} />);
    // Wait for component to load recipes from backend
    await act(() => promise);

    const selectedRecipe = recipe2;

    const recipeLink = screen.getByText(selectedRecipe.name);
    expect(recipeLink).not.toBeNull();
    fireEvent.click(recipeLink);

    // The recipe detail should show the ingredients
    recipe2.ingredients.map(({name}) => expect(screen.getByText(name)).not.toBeNull() );

    expect(getRecipesFromDb).toHaveBeenCalled();
    expect(deleteRecipeFromDb).not.toHaveBeenCalled();
    expect(addOrUpdateRecipeInDb).not.toHaveBeenCalled();
  });

  test.skip('it should hide the recipe details when a recipe is deselected',async () => {
    const promise = Promise.resolve({
      data: recipes,
    });
    const getRecipesFromDb = jest.fn(async () => promise);
    const deleteRecipeFromDb = jest.fn();
    const addOrUpdateRecipeInDb = jest.fn();

    render(<RecipeComponent getRecipesFromDb={getRecipesFromDb}
                            deleteRecipeFromDb={deleteRecipeFromDb}
                            addOrUpdateRecipeInDb={addOrUpdateRecipeInDb} />);
    // Wait for component to load recipes from backend
    await act(() => promise);

    const selectedRecipe = recipe2;

    const recipeLink = screen.getByText(selectedRecipe.name);
    expect(recipeLink).not.toBeNull();
    fireEvent.click(recipeLink);

    // The recipe detail should show the delete button
    const button = screen.getByText('Delete');
    expect(button).not.toBeNull();

    fireEvent.click(recipeLink);

    await act(async () => waitForElementToBeRemoved(() => button));

    expect(screen.getByText('Delete')).toBeNull();

    // The Delete button should no longer be shown
    expect(getRecipesFromDb).toHaveBeenCalled();
    expect(deleteRecipeFromDb).not.toHaveBeenCalled();
    expect(addOrUpdateRecipeInDb).not.toHaveBeenCalled();
  });

  test('it should delete the selected recipe when a recipe is selected and the delete button is clicked',async () => {
    const getRecipesPromise = Promise.resolve({
      data: recipes,
    });
    const deleteRecipesPromise = Promise.resolve();
    const getRecipesFromDb = jest.fn(async () => getRecipesPromise);
    const deleteRecipeFromDb = jest.fn(async () => deleteRecipesPromise);
    const addOrUpdateRecipeInDb = jest.fn();

    render(<RecipeComponent getRecipesFromDb={getRecipesFromDb}
                            deleteRecipeFromDb={deleteRecipeFromDb}
                            addOrUpdateRecipeInDb={addOrUpdateRecipeInDb} />);
    // Wait for component to load recipes from backend
    await act(() => getRecipesPromise);

    const selectedRecipe = recipe2;

    const recipeLink = screen.getByText(selectedRecipe.name);
    expect(recipeLink).not.toBeNull();
    fireEvent.click(recipeLink);

    const button = screen.getByText('Delete');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    // Wait for recipe to be deleted from backend
    await act(() => getRecipesPromise);

    expect(getRecipesFromDb).toHaveBeenCalled();
    expect(deleteRecipeFromDb).toHaveBeenCalledWith(selectedRecipe.id);
    expect(addOrUpdateRecipeInDb).not.toHaveBeenCalled();
  });

  test('it should show the edit recipe form when a recipe is selected and the edit button is clicked',async () => {
    const getRecipesPromise = Promise.resolve({
      data: recipes,
    });
    const getRecipesFromDb = jest.fn(async () => getRecipesPromise);
    const deleteRecipeFromDb = jest.fn();
    const addOrUpdateRecipeInDb = jest.fn();

    render(<RecipeComponent getRecipesFromDb={getRecipesFromDb}
                            deleteRecipeFromDb={deleteRecipeFromDb}
                            addOrUpdateRecipeInDb={addOrUpdateRecipeInDb} />);
    // Wait for component to load recipes from backend
    await act(() => getRecipesPromise);

    const selectedRecipe = recipe2;

    const recipeLink = screen.getByText(selectedRecipe.name);
    expect(recipeLink).not.toBeNull();
    fireEvent.click(recipeLink);

    const button = screen.getByText('Edit');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    const ingredientsSelectBox = screen.getByTestId('ingredients-select-box');
    expect(ingredientsSelectBox).not.toBeNull();

    expect(getRecipesFromDb).toHaveBeenCalled();
    expect(deleteRecipeFromDb).not.toHaveBeenCalled();
    expect(addOrUpdateRecipeInDb).not.toHaveBeenCalled();
  });


  test('it should show the edit recipe form when the add recipe button is clicked',async () => {
    const getRecipesPromise = Promise.resolve({
      data: recipes,
    });
    const addOrUpdateRecipePromise = Promise.resolve();
    const getRecipesFromDb = jest.fn(async () => getRecipesPromise);
    const deleteRecipeFromDb = jest.fn();
    const addOrUpdateRecipeInDb = jest.fn(async () => addOrUpdateRecipePromise);

    render(<RecipeComponent getRecipesFromDb={getRecipesFromDb}
                            deleteRecipeFromDb={deleteRecipeFromDb}
                            addOrUpdateRecipeInDb={addOrUpdateRecipeInDb} />);
    // Wait for component to load recipes from backend
    await act(() => getRecipesPromise);

    const button = screen.getByText('Add recipe');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    const ingredientsSelectBox = screen.getByTestId('ingredients-select-box');
    expect(ingredientsSelectBox).not.toBeNull();

    expect(getRecipesFromDb).toHaveBeenCalled();
    expect(deleteRecipeFromDb).not.toHaveBeenCalled();
    expect(addOrUpdateRecipeInDb).not.toHaveBeenCalled();
  });
});
