import styled, { createGlobalStyle } from 'styled-components';
import px2vw from './px2vw'

import Creatable from 'react-select/creatable';

/*
* Reponsive and adaptive style
*/
const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    font-size: ${px2vw(24)};

    @media (min-width: 768px) {
      font-size: ${px2vw(18)};
    }

    @media (min-width: 1024px) {
      font-size: ${px2vw(16)};
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${px2vw(32)};
  max-width: 100%;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

const Box = styled.div`
  display: flex;
  width: ${px2vw(320, 320)};
  min-height: ${px2vw(50, 320)};
  flex-direction: column;
  padding: ${px2vw(20)};
  margin: ${px2vw(20)};
  background-color: ${props => props.bgColor};
  height: 100%;

  @media (min-width: 768px) {
    width: ${px2vw(640, 768)};
    min-height: ${px2vw(100, 768)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    width: ${px2vw(860)};
    min-height: ${px2vw(200)};
    height: 100%;
  }
`;

/*
* Top level styles
*/

const StyledApp = styled.section`
  padding: 4em;
  background: ivory;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2em;
  width: 100%;
  text-align: center;
  color: teal;
  padding: 1em;
`;

const Button = styled.button`
  color: royalblue;
  font-size: 1em;
  padding: 0.2em 0.5em;
  display: block;
` ;

const AddButton = styled(Button) `
  margin: 0 auto;
  font-family: inherit;
  font-size: 100%;
  width: 40%;
`;

/*
* Recipe List
*/

const RecipeTable = styled(Box)`
  border-radius: ${px2vw(3)};
  border: 2px solid thistle;
  width: 100%;
  margin: 3px auto;
  display: flex;
  flex-flow: column wrap;
`;

const RecipeTableRow = styled.div`
    border: ${props => (
      props.highlight
        ? '1px solid darkslateblue' 
        : '1px hidden gainsboro')
  };
  display: flex;
  flex-direction: row;
`;

const RecipeTableItem = styled.div`
  border: 1px solid thistle;
  border-collapse: collapse;
  padding: 2px;
  text-align: left;
`;

const RecipeTableNameItem = styled(RecipeTableItem)`
  flex: 0 0 ${px2vw(140)}
`;

const RecipeTableDescriptionItem = styled(RecipeTableItem)`
  flex: 1 1 auto
`;

/*
 * Recipe Detail
 */

const RecipeDetailContainer = styled(Box)`
  display: flex;
  flex-flow: column wrap;
  text-align: left;
`;

const RecipeDetailName = styled.h2`
  text-align: left;
  color: mediumslateblue;
`;

const RecipeDetailDescription = styled.p`
  padding: 1em;
`;

const IngredientListBox = styled.div`
  text-align: left;
`;

const IngredientListContainer = styled.ul`
  list-style-type: disc;
  padding: 1em;
`;

const IngredientListItem = styled.li`
`;

const IngredientListSelect = styled(Creatable)`
  flex: 0 0  ${px2vw(200)}
`;

const RecipeDetailButtons = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
`;

const RecipeDetailButton = styled(Button)`
  margin: 2px;
`;

/*
* Recioe Form
*/

const StyledForm = styled.form`
  margin: 0 auto;
  width: ${px2vw(500)};
  padding: 1em;
  border: 1px solid #CCC;
  border-radius: 1em;
`;

const FormTitle = styled.h2`
  color: mediumslateblue;
`;

const FormContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLabel = styled.label`
  display: inline-block;
  width: ${px2vw(90)};
  text-align: left;
  color: steelblue;
`;

const StyledInput = styled.input`
  font: 1em sans-serif;
  width: 100%;
  box-sizing: border-box;
  padding: 0.3em;
  border: 1px solid #999;
  border-radius: 0.3em;
`;


const StyledTextArea = styled.textarea`
  resize: none;
  font: 1em sans-serif;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #999;
  vertical-align: top;
  padding: 0.3em;
  height: 5em;
  border-radius: 0.3em;
`;

const StyledSubmitButton = styled.input.attrs({
    type: 'submit',
    value: 'Submit'
  })`
  color: royalblue;
  font-size: 1em;
  padding: 0.2em 0.5em;
  display: inline-block;
`;

const StyledCancelButton = styled.input.attrs({
    type: 'button',
    value: 'Cancel'
  })`
  color: royalblue;
  font-size: 1em;
  padding: 0.2em 0.5em;
  display: inline-block;
`;

const styles = {
  Global,
  Container,
  Box,
  StyledApp,
  Title,
  Button,
  AddButton,
  RecipeTable,
  RecipeTableRow,
  RecipeTableNameItem,
  RecipeTableDescriptionItem,
  RecipeDetailContainer,
  RecipeDetailName,
  RecipeDetailDescription,
  IngredientListBox,
  IngredientListItem,
  IngredientListContainer,
  IngredientListSelect,
  RecipeDetailButtons,
  RecipeDetailButton,
  StyledForm,
  FormTitle,
  FormContent,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  StyledSubmitButton,
  StyledCancelButton,
};

export default styles;
