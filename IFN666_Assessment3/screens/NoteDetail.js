import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { GlobalLayout } from "../components/Layout";

const NoteDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, noteId } = route.params;
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/note/${noteId}`);
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
      await axios.delete(`http://localhost:3000/api/note/${noteId}`);
      Alert.alert('Success', 'Note deleted successfully');
      backToNotes();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete note. Please try again later.');
    }
  };

  const backToNotes = async () => {
    if (editMode) {
      try {
        await axios.put(`http://localhost:3000/api/note/${noteId}`, { title, content: note });
        Alert.alert('Success', 'Note updated successfully');
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backToNotes} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.date}>
          {moment(date).format('MMMM D, YYYY')}
        </Text>
        <TouchableOpacity onPress={deleteNote} style={styles.trashButton}>
          <Ionicons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerBorder}></View>
      
     <View style={styles.noteContainer}>
      {editMode ? (
        <>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            />
          <TextInput
            style={styles.contentInput}
            value={note}
            onChangeText={setNote}
            multiline
            />
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{note}</Text>
          </TouchableOpacity>
        </>
      )}
      </View>
    </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }, 
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
    height: 200,
  },
});

export default NoteDetail;
