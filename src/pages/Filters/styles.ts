import styled from 'styled-components/native';

interface IContainer {
  height: number;
  width: number;
}

export const Container = styled.View<IContainer>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  justify-content: center;
  align-items: center;
`;
