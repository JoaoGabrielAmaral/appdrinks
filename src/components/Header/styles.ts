import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  padding-top: 150px;
`;

export const ContainerIcon = styled.View`
  padding: 10px;
  margin: 5px;
  border-radius: 30px;
  position: absolute;
  background-color: #fff;
`;

export const IconBack = styled(Icon).attrs(() => ({
  size: 15,
  color: '#000',
}))``;

export const ContainerTitle = styled.View`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
