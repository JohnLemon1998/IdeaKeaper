import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
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
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="TopPage" component={TopPage} options={{ headerShown: false }} />
            <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown: false }} />
            <Stack.Screen name="NoteDetail" component={NoteDetail} options={{ headerShown: false }} />
            <Stack.Screen name="SettingTop" component={SettingTop} options={{ headerShown: false }} />
            <Stack.Screen name="ChangeUserName" component={ChangeUserName} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
