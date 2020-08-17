import styled from 'styled-components/native';

interface IProps {
  active?: boolean;
}

export const Container = styled.View<IProps>`
  background-color: ${props => (props.active ? '#fff' : '#EB5757')};
  border-width: 1px;
  border-color: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
`;

export const Text = styled.Text<IProps>`
  color: ${props => (props.active ? '#EB5757' : '#fff')};
`;
