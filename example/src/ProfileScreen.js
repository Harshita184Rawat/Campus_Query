import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher's Profile</Text>
      <Text style={styles.text}>Name: John Doe</Text>
      <Text style={styles.text}>Subject: Math</Text>
      <Text style={styles.text}>Email: johndoe@example.com</Text>
      <Text style={styles.text}>Phone: +1 234 567 890</Text>
      {/* Add more profile details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ProfileScreen;
