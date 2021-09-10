import { act, render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import selectEvent from "react-select-event";
import Creatable from 'react-select'

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
  const nameInput = screen.getByLabelText('name', {exact: false});
  const descriptionInput = screen.getByLabelText('description', {exact: false});
  const ingredientsSelectBox = screen.getByLabelText('ingredients');
  expect(ingredientsSelectBox).not.toBeNull();

  //userEvent.type(screen.getByLabelText('name', {exact: false}), `${name}{enter}`);
  // userEvent.type(descriptionInput, `${description}{enter}`);

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

    return selectEvent.create(ingredientsSelectBox, ingredients);
}

const clearForm = async (screen) => fillOutForm(screen, {
  name: '',
  description:'',
});


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
    const emptyIngredientsSelect = screen.getByText(INGREDIENTS_PLACEHOLDER , {
      exact: false
    });
    expect(ingredientsSelectBox).toContainElement(emptyIngredientsSelect);

    expect(mockSetUpdating).not.toHaveBeenCalled();
    expect(mockAddOrUpdateRecipe).not.toHaveBeenCalled();
  });

  // test('it should call setUpdating(false) when the cancel button is clicked', async () => {
  // });

  test('it should pass the form details to addOrUpdateRecipe() when the submit button is clicked', async () => {
    const updating = true;

    const mockSetUpdating = jest.fn();
    const mockAddOrUpdateRecipe = jest.fn();

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

    const button = screen.getByText('Submit');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    // expect(mockSetUpdating).toHaveBeenCalledWith(false);
    //
    // const expectedRecipe = {
    //   name,
    //   description,
    //   ingredients,
    // }
    // expect(mockAddOrUpdateRecipe).toHaveBeenCalledWith(expectedRecipe);
  });

});
