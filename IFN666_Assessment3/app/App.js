import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import index from './index';
import Login from './Login';
import AddNote from './AddNote';
import Signup from './Signup';
import TopPage from './TopPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="TopPage" component={TopPage} />
        <Stack.Screen name="AddNote" component={AddNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
