import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalLayout } from "../components/Layout";
import { API_BASE_URL } from '@env';

const AddNote = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSaveNote = async () => {
    try {
      const Data = { userId, title, content };
      const url = `${API_BASE_URL}/api/note`; 
      const response = await axios.post(url, Data);

      if (!response.data.error) {
        backToNotes();
      } else {
        console.error('Error:', response.data.message);
      }  
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const backToNotes = () => {
    navigation.navigate('TopPage', { userId });
  };

  return (
    <GlobalLayout>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToNotes}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{getTodayDate()}</Text>
        <Text></Text>
      </View>
      <View style={styles.headerBorder}></View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter note title"
        />
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Enter note content"
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
          <Text style={styles.buttonText}>Save Note</Text>
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
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textContainer: {
    backgroundColor: 'khaki',
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 300,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNote;
