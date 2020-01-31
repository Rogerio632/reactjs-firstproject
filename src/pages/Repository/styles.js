import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div.attrs(props => ({
  loading: props.loading,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${props =>
    props.loading &&
    css`
      animation: ${rotate} 2s linear infinite;
    `}
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul.attrs(props => ({
  disabled: props.disabled,
}))`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
    :last-child {
      display: flex;
      justify-content: space-evenly;
      border: none;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }

  svg {
    width: 40px;
    height: 40px;
    cursor: pointer;

    &[disabled] {
      color: #ccc;
      pointer-events: none;
      :hover {
        color: #ccc;
        cursor: not-allowed;
      }
    }

    :hover {
      color: #333;
    }
  }
`;

export const Select = styled.select`
  border-radius: 3px;
  background: #fff;
  border: none;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
    background: #7159c1;
    color: #fff;
  }
`;
