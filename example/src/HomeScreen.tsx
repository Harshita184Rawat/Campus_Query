import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon library
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen:React.FC<Props> = ({ navigation }) =>{
  const handlePress = (role: string) => {
    Alert.alert(`Selected Role: ${role}`);
    // Navigate to respective pages based on the role
  };

  return (
    <View style={styles.container}>
     <Image
             source={require('../assets/logo.png')}  // Path to your local image
             style={styles.image}
           />
      <Text style={styles.title}>Welcome to Campus Query</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Loginstudent')}
          //onPress={() => handlePress('Student')}
        >
          <Icon name="school" size={40} color="#fff" />
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Loginteacher')}
//           onPress={() => handlePress('Teacher')}
        >
          <Icon name="account" size={40} color="#fff" /> {/* Changed to "account" for consistency */}
          <Text style={styles.buttonText}>Teacher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
image: {
    width: 200,   // Set the width of the image
    height: 200,  // Set the height of the image
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '40%',
    height: 100,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8, // Add spacing between the icon and text
  },
});

export default HomeScreen;
