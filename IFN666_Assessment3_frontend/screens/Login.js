import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalLayout2 } from "../components/Layout";
import { API_BASE_URL } from '@env';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Function to handle the login process
  const handleLogin = async() => {
    try {
      // Send a POST request to the server to authenticate the user
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      const userId = data.id;

      // Check if there's an error in the response
      if (data.error) {
        Alert.alert('Login Error', data.message);
      } else {
        navigation.navigate('TopPage',{ userId });
      }
    } catch (error) {
        console.error('Login Error', error.message);
    }
  };

  return (
     <GlobalLayout2>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Sign up here</Text>
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

export default LoginPage;
