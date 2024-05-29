import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalLayout } from "../components/Layout";
import { API_BASE_URL } from '@env';
import { GlobalStyles } from "../styles/global";
import { useTheme } from '../context/theme';

const ChangePassword = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const globalstyles = GlobalStyles();
  const { isDarkMode } = useTheme();

  const backToSetting = () => {
    navigation.navigate('SettingTop', { userId });
  };

  const handleChangePassword = async () => {

    if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

    try {
        const response = await axios.put(`${API_BASE_URL}/api/users/${userId}/change-password`, {
          newPassword,
        });
  
        const data = response.data;
  
        if (data.error) {
          console.error('Change password error:', data.message);
        } else {
          Alert.alert("Updated","Password is successfully updated");
          navigation.goBack();
        }
      } catch (error) {
        console.error('Change password error:', error);
      }
    };

  return (
    <GlobalLayout>
      <View style={styles.header}>
          <TouchableOpacity onPress={backToSetting}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
          </TouchableOpacity>
          <Text style={[styles.headerText,globalstyles.text]}>Change Password</Text>
          <Text></Text>
        </View>
        <View style={styles.headerBorder}></View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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
    backgroundColor: 'white'
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

export default ChangePassword;
