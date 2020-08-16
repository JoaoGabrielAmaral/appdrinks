import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const ContainerIcon = styled.View`
  padding: 10px;
  margin: 5px;
  border-radius: 30px;
  background-color: #fff;
`;

export const IconBack = styled(Icon).attrs(() => ({
  size: 20,
  color: '#000',
}))``;
