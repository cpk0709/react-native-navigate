import React from 'react';

import {StyleSheet, Text, View, Button} from 'react-native';
import Header from './src/Header';
import Generator from './src/Generator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen!</Text>
      <Button
        title="To User Screen"
        onPress={() => {
          navigation.navigate('Details', {
            userIdx: 100,
            userName: 'cpk',
            userLastName: 'choi',
          });
        }}
      />
      <Button
        title="Change the title"
        onPress={() => navigation.setOptions({title: 'Changed!!'})}
      />
    </View>
  );
};

const DetailsScreen = props => {
  console.log(props);
  console.log(props.route.params, '&&&&');
  const {userName} = props.route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>{userName}</Text>
      <Button
        title="To Home"
        onPress={() => props.navigation.navigate('Home')}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const onAddRandomNum = () => {
    alert('add number!');
  };

  return (
    <NavigationContainer>
      {/* <View style={styles.mainView}>
        <Header text="Hello World!!" />
        <Generator add={onAddRandomNum} />
      </View> */}
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home Screen'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{
            userIdx: 150,
            userName: 'cpk0709',
            userLastName: 'Choi',
          }}
          options={{title: 'Details Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
