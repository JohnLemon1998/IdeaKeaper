import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../styles/global";

export function GlobalLayout({ children }) {
  
  const globalstyles = GlobalStyles();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={globalstyles.background}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export function GlobalLayout2({ children }) {
  return (
    <SafeAreaView style={styles.safeArea2}>
       <View style={styles.container2}>
        {children}
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container:{
    flex: 1,
  },
  safeArea2: {
    flex: 1,
  },
  container2:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});
