import { render, fireEvent, screen } from '@testing-library/react';

import IngredientList from './IngredientList';

import testData from '../../data/testData';

const { recipe1 : recipe } = testData;

describe('IngredientList', () => {
  test('it should display the names of the ingredients supplied', () => {
    render(<IngredientList ingredients={recipe.ingredients}/>);

    recipe.ingredients.map(({name}) => expect(screen.getByText(name)).toBeInTheDocument() );
  });
});
