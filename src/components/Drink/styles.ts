import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-radius: 10px;
  margin: 5px 10px 5px 10px;
`;

export const ContainerImage = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
`;

export const ContainerTitle = styled.View`
  flex: 1;
  margin-top: 5px;
`;

export const Title = styled.Text`
  font-weight: bold;
`;

export const ContainerIcon = styled.View`
  justify-content: center;
  padding: 0px 10px 0px 10px;
`;

export const IconDetail = styled(Icon).attrs(() => ({
  size: 15,
  name: 'arrow-right',
  color: '#EB5757',
}))``;
