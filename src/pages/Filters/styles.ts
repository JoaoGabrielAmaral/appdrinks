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

interface IContainerItem {
  height: number;
}

export const ContainerItem = styled.View<IContainerItem>`
  height: ${props => props.height}px;
  width: 100px;
  justify-content: center;
  padding: 0px 10px 0px 10px;
  margin: 5px 10px 0px 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Item = styled.Text`
  color: #000;
  text-align: center;
`;

export const FilterName = styled.Text`
  color: #fff;
  font-size: 25px;
  padding-left: 10px;
`;

export const NoRecords = styled.Text`
  color: #fff;
  font-size: 15px;
`;
