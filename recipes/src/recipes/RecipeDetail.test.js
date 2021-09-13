import { render, fireEvent, screen } from '@testing-library/react';

import RecipeDetail from './RecipeDetail';
import testData from '../../data/testData';

const { recipe1, recipe2, recipe3 } = testData;

describe('RecipeDetail', () => {

  const recipes = [ recipe1, recipe2, recipe3 ];
  const selected = 2;

  test('it should display the recipe detail', () => {
    const mockSetUpdating = jest.fn();
    const mockDeleteReipe = jest.fn();

    render(<RecipeDetail recipes={recipes}
                         selected={selected}
                         setUpdating={mockSetUpdating}
                         deleteRecipe={mockDeleteReipe}/>);

    expect(screen.getByText(recipe2.name)).not.toBeNull();
    expect(screen.getByText(recipe2.description)).not.toBeNull();

    recipe2.ingredients.map(({name}) => expect(screen.getByText(name)).not.toBeNull() );

    expect(mockSetUpdating).not.toHaveBeenCalled();
    expect(mockDeleteReipe).not.toHaveBeenCalled();
  });

  test('it should pass the recipe id to setUpdating() when the edit button is clicked)', () => {
    const mockSetUpdating = jest.fn();
    const mockDeleteReipe = jest.fn();

    render(<RecipeDetail recipes={recipes}
                         selected={selected}
                         setUpdating={mockSetUpdating}
                         deleteRecipe={mockDeleteReipe}/>);

    const button = screen.getByText('Edit');

    expect(button).not.toBeNull();
    fireEvent.click(button);

    expect(mockSetUpdating).toHaveBeenCalledWith(recipe2.id);
    expect(mockDeleteReipe).not.toHaveBeenCalled();
  });

  test('it should pass the recipe id to deleteRecipe() when the delete button is clicked)', () => {
    const mockSetUpdating = jest.fn();
    const mockDeleteReipe = jest.fn();

    render(<RecipeDetail recipes={recipes}
                         selected={selected}
                         setUpdating={mockSetUpdating}
                         deleteRecipe={mockDeleteReipe}/>);

    const button = screen.getByText('Delete');
    expect(button).not.toBeNull();
    fireEvent.click(button);

    expect(mockDeleteReipe).toHaveBeenCalledWith(recipe2.id);
    expect(mockSetUpdating).not.toHaveBeenCalled();
  });
});
