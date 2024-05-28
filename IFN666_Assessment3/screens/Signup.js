import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { GlobalLayout } from "../components/Layout";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const userData = { name, password };
      const url = 'http://localhost:3000/api/signup'; 
      const response = await axios.post(url, userData);
      
      navigation.navigate('Login');
      
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <GlobalLayout>
       <View style={styles.container}>
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
       </View>
     </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
