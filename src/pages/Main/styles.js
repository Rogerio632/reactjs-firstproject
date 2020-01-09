import styled from 'styled-components';

export const Title = styled.h1`
 font-size: 24px;
 color: ${props => (props.error  ? 'red' : '#7159c5') };
 font-family: Arial, Helvetica, sans-serif;
 :hover{
   font-size: 24.5px;
   color: #7159f9;
   cursor: pointer;
 }
 :active{
   color: #7159;
 }
`;

export const Small = styled.small`
   font-size: 15px;
   color: ${props => (props.success ? 'green' : '#000444') };
   cursor: pointer;
   font-family: Arial, Helvetica, sans-serif;
   :active{
     color: #000999;
     font-size: 15.5px;
   }
`;
