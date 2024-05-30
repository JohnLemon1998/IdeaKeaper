import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalLayout } from "../components/Layout";
import { API_BASE_URL } from '@env';
import { GlobalStyles } from "../styles/global";
import { useTheme } from '../context/theme';

const ChangeUserName = () => {
  const route = useRoute(); 
  const { userId } = route.params; 
  const navigation = useNavigation(); 
  const [newUserName, setNewUserName] = useState(''); 
  const globalstyles = GlobalStyles(); 
  const { isDarkMode } = useTheme();

  // Function to navigate back to the settings page
  const backToSetting = () => {
    navigation.navigate('SettingTop', { userId });
  };

  // Function to handle changing the username
  const handleChangeUserName = async () => {
    try {
      // Make a PUT request to change the user's username
      const response = await axios.put(`${API_BASE_URL}/api/users/${userId}/change-username`, {
        newUserName,
      });

      const data = response.data;

      // Check if there is an error in the response
      if (data.error) {
        console.error('Change username error:', data.message);
      } else {
        Alert.alert("Updated", "Username is successfully updated");
        navigation.goBack(); // Navigate back to the previous screen
      }
    } catch (error) {
      console.error('Change username error:', error);
    }
  };

  return (
    <GlobalLayout>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToSetting}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerText,globalstyles.text]}>Change UserName</Text>
        <Text></Text>
      </View>
      <View style={styles.headerBorder}></View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New User Name"
          value={newUserName}
          onChangeText={setNewUserName}
          />
        <TouchableOpacity style={styles.button} onPress={handleChangeUserName}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
     </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginRight:20,
    fontWeight: 'bold',
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  inputContainer: {
    marginTop: 200,
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  button: {
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChangeUserName;
