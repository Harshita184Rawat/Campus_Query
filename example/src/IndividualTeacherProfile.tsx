import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const IndividualTeacherProfile = () => {
  const [editable, setEditable] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [contact, setContact] = useState('+1234567890');
  const [password, setPassword] = useState('password123');
  const [department, setDepartment] = useState('Computer Science');
  const [qualification, setQualification] = useState('M.Sc. in Computer Science');
  const [experience, setExperience] = useState('5 years');
  const [interest, setInterest] = useState('Artificial Intelligence');
  const [timetable, setTimetable] = useState('Mon-Fri: 9AM - 5PM');

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({ noData: true }, response => {
      if (response.uri) {
        setProfilePhoto(response.uri);
      }
    });
  };

  const handleSave = () => {
    // Save the updated profile details (e.g., API call)
    Alert.alert('Profile Updated', 'Your profile details have been saved!');
    setEditable(false);
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>{name}</Text>
      </View>

      <Text style={styles.sectionTitle}>Account Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          editable={editable}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          editable={editable}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          editable={editable}
          value={contact}
          onChangeText={setContact}
          placeholder="Contact"
        />
        <TextInput
          style={styles.input}
          editable={editable}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      <Text style={styles.sectionTitle}>Educational Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          editable={editable}
          value={department}
          onChangeText={setDepartment}
          placeholder="Department Specialization"
        />
        <TextInput
          style={styles.input}
          editable={editable}
          value={qualification}
          onChangeText={setQualification}
          placeholder="Qualification"
        />
        <TextInput
          style={styles.input}
          editable={editable}
          value={experience}
          onChangeText={setExperience}
          placeholder="Years of Experience"
        />
        <TextInput
          style={styles.input}
          editable={editable}
          value={interest}
          onChangeText={setInterest}
          placeholder="Subject Matter of Interest"
        />
      </View>

      <Text style={styles.sectionTitle}>Timetable</Text>
      <TextInput
        style={[styles.input, styles.timetableInput]}
        editable={editable}
        value={timetable}
        onChangeText={setTimetable}
        placeholder="Timetable"
      />

      <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
        <Text style={styles.buttonText}>{editable ? 'Cancel' : 'Edit'}</Text>
      </TouchableOpacity>

      {editable && (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  timetableInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default IndividualTeacherProfile;
