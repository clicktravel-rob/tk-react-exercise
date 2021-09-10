import {render, fireEvent, screen, act} from '@testing-library/react';
import selectEvent from "react-select-event";

import RecipeForm from './RecipeForm';
import testData from '../../data/testData';

const { recipe1, recipe2, recipe3 } = testData;

const INGREDIENTS_PLACEHOLDER = 'Select ingredients...';
const recipes = [ recipe1, recipe2, recipe3 ];


const fillOutForm = async (screen, {
  id,
  name = 'some name',
  description = 'some description',
  ingredients = [],
} = {}) => {
  const ingredientsSelectBox = screen.getByLabelText('ingredients');
  expect(ingredientsSelectBox).not.toBeNull();

  fireEvent.change(screen.getByLabelText('name', {exact: false}), {
    target: {
      value: name
    }
  });

  fireEvent.change(screen.getByLabelText('description', {exact: false}), {
    target: {
      value: description
    }
  });

  return ingredients.reduce(
    async (previousValue, name) => {
      await previousValue;

      return selectEvent.create(ingredientsSelectBox, name);
    },
    Promise.resolve(),
  );
}


describe('RecipeForm', () => {

  test('it should initialise the form from an existing recipe when "updating" matches the id of that recipe', () => {
    const updating = 2;
    const recipeUpdating = recipe2;

    const mockSetUpdating = jest.fn();
    const mockAddOrUpdateRecipe = jest.fn();

    const component = render(<RecipeForm recipes={recipes}
                       updating={updating}
                       setUpdating={mockSetUpdating}
                       addOrUpdateRecipe={mockAddOrUpdateRecipe}/>);

    const nameInputByLabel = screen.getByLabelText('name', {exact: false});
    expect(nameInputByLabel).not.toBeNull();
    const nameInput = screen.getByDisplayValue(recipeUpdating.name);
    expect(nameInputByLabel).toEqual(nameInput);

    const descriptionInputByLabel = screen.getByLabelText('description', {exact: false});
    expect(descriptionInputByLabel).not.toBeNull();
    const descriptionInput = screen.getByDisplayValue(recipeUpdating.description);
    expect(descriptionInputByLabel).toEqual(descriptionInput);

    const ingredientsSelectBox = screen.getByTestId('ingredients-select-box');
    recipeUpdating.ingredients.map(({
      name
    }) => expect(ingredientsSelectBox).toContainElement(screen.getByText(name)) );

    expect(mockSetUpdating).not.toHaveBeenCalled();
    expect(mockAddOrUpdateRecipe).not.toHaveBeenCalled();
  });

  test('it should display an empty form when "updating" does not match the id of any recipe', () => {
    const updating = true;

    const mockSetUpdating = jest.fn();
    const mockAddOrUpdateRecipe = jest.fn();

    const component = render(<RecipeForm recipes={recipes}
                                         updating={updating}
                                         setUpdating={mockSetUpdating}
                                         addOrUpdateRecipe={mockAddOrUpdateRecipe}/>);

    const nameInput = screen.getByLabelText('name', {exact: false});
    expect(nameInput).not.toBeNull();
    expect(nameInput).toHaveValue('');

    const descriptionInput = screen.getByLabelText('description', {exact: false});
    expect(descriptionInput).not.toBeNull();
    expect(descriptionInput).toHaveValue('');

    const ingredientsSelectBox = screen.getByTestId('ingredients-select-box');
    const emptyIngredientsSelect = screen.getByText(INGREDIENTS_PLACEHOLDER, {
      exact: false
    });
    expect(ingredientsSelectBox).toContainElement(emptyIngredientsSelect);

    expect(mockSetUpdating).not.toHaveBeenCalled();
    expect(mockAddOrUpdateRecipe).not.toHaveBeenCalled();
  });

  test('it should call setUpdating(false) when the cancel button is clicked', () => {
    const updating = 2;
    const recipeUpdating = recipe2;

    const mockSetUpdating = jest.fn();
    const mockAddOrUpdateRecipe = jest.fn();

    const component = render(<RecipeForm recipes={recipes}
                                         updating={updating}
                                         setUpdating={mockSetUpdating}
                                         addOrUpdateRecipe={mockAddOrUpdateRecipe}/>);

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).not.toBeNull();
    fireEvent.click(cancelButton);

    expect(mockSetUpdating).toHaveBeenCalledWith(false);
    expect(mockAddOrUpdateRecipe).not.toHaveBeenCalled();
  });

  test('it should pass the new recipe to addOrUpdateRecipe() when the submit button is clicked', async () => {
    const updating = true;

    const addOrUpdatePromise = Promise.resolve();

    const mockAddOrUpdateRecipe = jest.fn(async () => addOrUpdatePromise);
    const mockSetUpdating = jest.fn();

    const component = render(<RecipeForm recipes={recipes}
                                         updating={updating}
                                         setUpdating={mockSetUpdating}
                                         addOrUpdateRecipe={mockAddOrUpdateRecipe}/>);

    const name = 'Shepherds Pie';
    const description = 'Layer mashed potatoes over mince in a casserole dish and bake';
    const ingredients = [
      'Lamb mince',
      'Potatoes'
    ];

    await fillOutForm(screen, {
      name,
      description,
      ingredients,
    });

    const submitButton = screen.getByText('Submit');
    expect(submitButton).not.toBeNull();
    fireEvent.click(submitButton);

    await act(() => addOrUpdatePromise);

    const expectedRecipe = {
      name,
      description,
      ingredients: ingredients.map((name) => ({
        id: undefined,
        name,
      })),
    }
    expect(mockAddOrUpdateRecipe).toHaveBeenCalledWith(expectedRecipe);

    expect(mockSetUpdating).not.toHaveBeenCalled();
  });

  test('it should pass the updated recipe to addOrUpdateRecipe() when the submit button is clicked', async () => () => {
    const updating = 2;
    const recipeUpdating = recipe2;

    const mockSetUpdating = jest.fn();
    const mockAddOrUpdateRecipe = jest.fn();

    const component = render(<RecipeForm recipes={recipes}
                                         updating={updating}
                                         setUpdating={mockSetUpdating}
                                         addOrUpdateRecipe={mockAddOrUpdateRecipe}/>);

    const newName = `Vegan ${recipeUpdating.name}`;
    const newDescription = `${recipeUpdating.description} like a boss`;
    const newIngredients = recipeUpdating.ingredients.map((recipe) => ({
      ...recipe,
      name: `Vegan ${recipe.name}`
    }));

    const updatedRecipe = {
      id: recipe2.id,
      name: newName,
      description: newDescription,
      ingredients: newIngredients,
    };

    const submitButton = screen.getByText('Submit');
    expect(submitButton).not.toBeNull();
    fireEvent.click(submitButton);

    expect(mockSetUpdating).toHaveBeenCalledWith(false);

    expect(mockAddOrUpdateRecipe).toHaveBeenCalledWith(updatedRecipe);
  });

});
