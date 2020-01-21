import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  border: 0;
  border-radius: 4px;
  background: #7159c1;
  padding: 0 15px;
  margin-left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    margin-right: 0px !important;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    /**
  * quando se tem o & +, é verificado se há um li antes do atual.
  * Caso há, é aplicado a estilização. Caso não, não é aplicado.
   */
    & + li {
      border-top: 1px solid #ccc;
    }
  }
  a {
    color: #7159c1;
    text-decoration: none;
  }
`;
