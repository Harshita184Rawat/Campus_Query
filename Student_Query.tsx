import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const PostQueryScreen = () => {
  const [queryText, setQueryText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [audioRecording, setAudioRecording] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets?.[0]) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleAudioRecording = () => {
    if (!audioRecording) {
      // Start audio recording logic here
      setAudioRecording(true);
      Alert.alert('Recording started');
    } else {
      // Stop audio recording logic here
      setAudioRecording(false);
      Alert.alert('Recording stopped');
    }
  };

  const handleSubmit = () => {
    if (!queryText && !selectedImage && !audioRecording) {
      Alert.alert('Please add a query in text, image, or audio format.');
      return;
    }

    const queryDetails = {
      queryText,
      selectedImage,
      audioRecording,
      isPrivate,
      selectedTeacher,
    };
    console.log(queryDetails);
    Alert.alert('Your query has been posted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Your Query</Text>

      {/* Query Text Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Type your query here..."
        value={queryText}
        onChangeText={setQueryText}
        multiline
      />

      {/* Options for Query Posting Inline */}
      <View style={styles.optionsRow}>
        {/* Image Upload */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
          <Icon name="camera" size={30} color="#fff" />
          <Text style={styles.uploadText}>Photo</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}

        {/* Audio Recording */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleAudioRecording}>
          <Icon name={audioRecording ? 'microphone-off' : 'microphone'} size={30} color="#fff" />
          <Text style={styles.uploadText}>{audioRecording ? 'Stop' : 'Record'}</Text>
        </TouchableOpacity>

        {/* Privacy Option */}
        <TouchableOpacity style={styles.uploadButton} onPress={() => setIsPrivate(!isPrivate)}>
          <Icon name={isPrivate ? 'lock' : 'lock-open'} size={30} color="#fff" />
          <Text style={styles.uploadText}>{isPrivate ? 'Private' : 'Public'}</Text>
        </TouchableOpacity>
      </View>

      {/* Teacher Selection for Private Queries */}
      {isPrivate && (
        <View style={styles.teacherSelect}>
          <Text style={styles.teacherLabel}>Select Teacher:</Text>
          <TextInput
            style={styles.teacherInput}
            placeholder="Enter teacher's name"
            value={selectedTeacher}
            onChangeText={setSelectedTeacher}
          />
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Query</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  width: '100%',
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 8,
  },
  uploadText: {
    color: '#fff',
    marginTop: 5,
  },
  imagePreview: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 8,
  },
  teacherSelect: {
    marginBottom: 20,
  },
  teacherLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  teacherInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PostQueryScreen;
