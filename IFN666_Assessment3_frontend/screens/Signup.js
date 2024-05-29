import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { GlobalLayout2 } from "../components/Layout";
import { API_BASE_URL } from '@env';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const userData = { name, password };
      const url = `${API_BASE_URL}/api/signup`; 
      const response = await axios.post(url, userData);
      
      if (!response.data.error) {
        navigation.navigate('Login');
      } else {
        console.error('Error:', response.data.message);
      }  
    } catch (error) {
        console.error('Error:', error.message);
    }
  };

  return (
    <GlobalLayout2>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={setName}
          />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupText}>Already have an account? Log in here</Text>
        </TouchableOpacity>
     </GlobalLayout2>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
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
  signupText: {
    marginTop: 20,
    color: '#808080',
  },
});

export default SignupPage;
