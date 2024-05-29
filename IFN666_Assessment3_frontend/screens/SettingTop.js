import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalLayout } from "../components/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from '../context/theme';
import { GlobalStyles } from "../styles/global";

const SettingTop = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  const {isDarkMode, setIsDarkMode} = useTheme();
  const globalstyles = GlobalStyles();

  const backToNotes = () => {
    navigation.navigate('TopPage', { userId });
  };

  const goToChangeUserName = () =>{
    navigation.navigate('ChangeUserName', { userId })
  };

  const goToChangePassword = () =>{
    navigation.navigate('ChangePassword', { userId })
  };
  
  return (
     <GlobalLayout>
        <View style={styles.header}>
          <TouchableOpacity onPress={backToNotes}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
          </TouchableOpacity>
          <Text style={[styles.headerText,globalstyles.text]}>Settings</Text>
          <Text></Text>
        </View>
        <View style={styles.headerBorder}></View>

       <View style={styles.settingContainer}>
        <View style={[styles.sectionBorder,globalstyles.sticker]}>
            <Text style={[styles.darkModeText,globalstyles.text]}>Dark Mode</Text>
          <Switch 
            value={isDarkMode}
            onValueChange={async () => {
              await AsyncStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
              setIsDarkMode(!isDarkMode);
             }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
        <TouchableOpacity style={[styles.sectionBorder,globalstyles.sticker]} onPress={goToChangeUserName}>
          <Text style={[styles.buttonText,globalstyles.text]}>Change UserName</Text>
          <Ionicons name="arrow-forward" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sectionBorder,globalstyles.sticker]} onPress={goToChangePassword}>
          <Text style={[styles.buttonText,globalstyles.text]}>Change Password</Text>
          <Ionicons name="arrow-forward" size={24} color={isDarkMode ? "white" : "black"} />
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
  settingContainer: {
    paddingHorizontal: 16,
    marginTop:30,
  },
  sectionBorder: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 40,
    marginBottom: 20,
    backgroundColor : 'khaki',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  darkModeText: {
    fontSize:20,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default SettingTop;
