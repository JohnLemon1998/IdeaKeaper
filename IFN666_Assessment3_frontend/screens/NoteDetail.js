import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { GlobalLayout } from "../components/Layout";
import { API_BASE_URL } from '@env';
import { GlobalStyles } from "../styles/global";
import { useTheme } from '../context/theme';

const NoteDetail = () => {
  // Extracting parameters from the route
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, noteId } = route.params;

  // State variables to hold note details and edit mode
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState('');
  
  // Global styles and theme mode
  const globalstyles = GlobalStyles();
  const { isDarkMode } = useTheme();

  // Effect to fetch note details when component mounts
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/note/${noteId}`);
        setTitle(response.data.note.title);
        setNote(response.data.note.content);
        setDate(response.data.note.updated_at);
      } catch (error) {
        // Alert the user if fetching the note fails
        Alert.alert('Error', 'Failed to fetch note. Please try again later.');
      }
    };
    fetchNote();
  }, [noteId]);

  // Function to confirm note deletion
  const confirmDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: deleteNote },
      ],
      { cancelable: true }
    );
  };

  // Function to delete the note
  const deleteNote = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/note/${noteId}`);
      // Alert the user when the note is deleted successfully
      Alert.alert('Deleted','The note has been removed from the list');
      backToNotes();
    } catch (error) {
      // Alert the user if deleting the note fails
      Alert.alert('Error', 'Failed to delete note. Please try again later.');
    }
  };

  // Function to navigate back to the notes list
  const backToNotes = async () => {
    // Update the note if in edit mode before navigating back
    if (editMode) {
      try {
        await axios.put(`${API_BASE_URL}/api/note/${noteId}`, { title, content: note });
      } catch (error) {
        // Alert the user if updating the note fails
        Alert.alert('Error', 'Failed to update note. Please try again later.');
      }
    }
    // Navigate back to the 'TopPage' screen with the user ID as a parameter
    navigation.navigate('TopPage', { userId });
  };

  // Function to enable edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <GlobalLayout>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToNotes} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.date,globalstyles.text]}>
          {moment(date).format('MMMM D, YYYY')}
        </Text>
        <TouchableOpacity onPress={confirmDelete} style={styles.trashButton}>
          <Ionicons name="trash" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerBorder}></View>
      
     <View style={[styles.noteContainer,globalstyles.sticker]}>
      {editMode ? (
        <>
          <TextInput
            style={[styles.titleInput,globalstyles.text]}
            value={title}
            onChangeText={setTitle}
            />
          <TextInput
            style={[styles.contentInput,globalstyles.text]}
            value={note}
            onChangeText={setNote}
            multiline
            />
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={[styles.title,globalstyles.text]}>{title}</Text>
            <Text style={[styles.content,globalstyles.text]}>{note}</Text>
          </TouchableOpacity>
        </>
      )}
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
  backButton: {
    flex: 1,
  },
  date: {
    flex: 2,
    textAlign: 'center',
    fontSize: 16,
  },
  trashButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  noteContainer: {
    flex: 1,
    backgroundColor: "khaki",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    paddingHorizontal: 16,
  },
  content: {
    fontSize: 16,
    paddingHorizontal: 16,
    marginTop : 20,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    paddingHorizontal: 16,
  },
  contentInput: {
    fontSize: 16,
    paddingHorizontal: 16,
    marginTop : 20,
  },
});

export default NoteDetail;
