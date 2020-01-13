import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  max-width: 700px;
  margin: 80px auto;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  h1{
    font-size: 21px;
    display: flex;
    align-items: center;
  }
  svg{
    margin-right: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input{
    flex: 1;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 16px;
    }

`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`

  border: 0;
  border-radius: 4px;
  background: #7159c1;
  padding: 0 15px;
  margin-left: 10px;


  display: flex;
  align-items: center;
  justify-content: center;

  svg{
    margin-right: 0;
  }

`;
