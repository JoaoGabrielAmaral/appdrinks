import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

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
  flex-direction: row;
  align-items: center;
  height: ${props => props.height}px;
  padding: 0px 10px 0px 10px;
  margin: 5px 10px 0px 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const Item = styled.Text`
  flex: 1;
  color: #000;
`;

export const NoRecords = styled.Text`
  font-size: 15px;
`;

export const IconDetail = styled(Icon).attrs(() => ({
  name: 'arrow-right',
  size: 15,
  color: '#EB5757',
}))`
  padding: 0px 10px 0 10px;
`;

export const ContainerFlatList = styled.View`
  flex: 1;
  background-color: #f6f6f6;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
