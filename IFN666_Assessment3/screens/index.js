import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalLayout } from "../components/Layout";

const index = () => {

  const navigation = useNavigation();

  return (
   <GlobalLayout>
    <View style={styles.container}>
      <Image
        source={require('../assets/images/homePageIcon.webp')}
        style={styles.image}
        />
      <Text style={styles.title}>Welcome to Idea Keeper App</Text>
      <Text style={styles.subtitle}>Your idea won't be missing anymore</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
     </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 50,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    width: '100%',
  },
  button: {
    width: '45%',
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default index;
