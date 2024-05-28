import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import index from './screens/index';
import Login from './screens/Login';
import AddNote from './screens/AddNote';
import Signup from './screens/Signup';
import TopPage from './screens/TopPage';
import NoteDetail from './screens/NoteDetail';
import SettingTop from './screens/SettingTop';
import ChangePassword from './screens/ChangePassword';
import ChangeUserName from './screens/ChangeUserName';
import { ThemeProvider } from './context/theme';

const Stack = createStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="index">
            <Stack.Screen name="index" component={index} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="TopPage" component={TopPage} />
            <Stack.Screen name="AddNote" component={AddNote} />
            <Stack.Screen name="NoteDetail" component={NoteDetail} />
            <Stack.Screen name="SettingTop" component={SettingTop} />
            <Stack.Screen name="ChangeUserName" component={ChangeUserName} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
