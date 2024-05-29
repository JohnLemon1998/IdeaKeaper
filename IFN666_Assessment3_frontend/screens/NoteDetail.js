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
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, noteId } = route.params;
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState('');
  const globalstyles = GlobalStyles();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/note/${noteId}`);
        setTitle(response.data.note.title);
        setNote(response.data.note.content);
        setDate(response.data.note.updated_at);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch note. Please try again later.');
      }
    };
    fetchNote();
  }, [noteId]);

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

  const deleteNote = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/note/${noteId}`);
      Alert.alert('Deleted','the note has been removed from the list');
      backToNotes();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete note. Please try again later.');
    }
  };

  const backToNotes = async () => {
    if (editMode) {
      try {
        await axios.put(`${API_BASE_URL}/api/note/${noteId}`, { title, content: note });
      } catch (error) {
        Alert.alert('Error', 'Failed to update note. Please try again later.');
      }
    }
    navigation.navigate('TopPage', { userId });
  };

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
