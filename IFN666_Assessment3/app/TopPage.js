import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView  } from 'react-native';
import axios from 'axios';
import { useRoute,useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TopPage = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/note?userId=${userId}`);
        const sortedNotes = response.data.notes.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setNotes(sortedNotes);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchNotes();
  }, [userId]);

  const handleAddNote = () => {
    navigation.navigate('AddNote', { userId:userId });
  };

  const handleSettingTop = () => {
    navigation.navigate('SettingTop', { userId:userId });
  };

  const handleNotePress = (noteId) => {
    navigation.navigate('NoteDetail', { userId: userId, noteId: noteId });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Notes</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleSettingTop}>
            <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerBorder}></View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.notesContainer}>
          {notes.map((note, index) => (
             <TouchableOpacity key={index} style={styles.noteContainer} onPress={() => handleNotePress(note.id)}>
              <View style={styles.note}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.noteContent}>{note.content}</Text>
                <Text style={styles.date}>{formatDate(note.updated_at)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
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
    fontWeight: 'bold',
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  scrollView: {
    flex: 1,
    marginTop:3,
  },
  notesContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  noteContainer: {
    marginBottom: 16,
    marginTop: 0,
  },
  note: {
    backgroundColor: 'khaki',
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 15,
    borderRadius: 8,
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  noteContent : {
    fontSize: 16,
    color: 'gray',
  },
  date : {
    marginTop :10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'dodgerblue',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopPage;
