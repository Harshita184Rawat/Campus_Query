import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

const TeacherResponsePage = () => {
  const [query, setQuery] = useState('What is the capital of France?'); // Example student query
  const [audioUri, setAudioUri] = useState<string | null>(null); // Store audio URI
  const [solutionText, setSolutionText] = useState<string>(''); // Text input for solution
  const [imageUri, setImageUri] = useState<string | null>(null); // Store image URI
  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const [responses, setResponses] = useState<any[]>([]); // Store all responses from the teacher (audio, text, and image)
  const [isTextVisible, setIsTextVisible] = useState(false); // Manage visibility of text input

  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    // Initialize audio recorder when component mounts
    console.log('AudioRecorderPlayer initialized');
    return () => {
      audioRecorderPlayer.stopRecorder(); // Ensure recorder is stopped when component unmounts
    };
  }, []);

  // Start recording audio
  const startRecording = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setAudioUri(result);
      setIsRecording(true);
      console.log('Recording started...');
    } catch (err) {
      console.error('Error starting recording', err);
      Alert.alert('Error', 'Failed to start audio recording');
    }
  };

  // Stop recording audio
  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setAudioUri(result);
      setIsRecording(false);
      console.log('Recording stopped');
    } catch (err) {
      console.error('Error stopping recording', err);
      Alert.alert('Error', 'Failed to stop audio recording');
    }
  };

  // Function to pick an image from gallery or camera
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', cameraType: 'back' }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick an image');
      } else {
        setImageUri(response.assets![0].uri); // Image picked successfully
      }
    });
  };

  // Function to add responses (audio, text, image)
  const addResponse = () => {
    let newResponses = [...responses];

    // Add audio response if available
    if (audioUri) {
      newResponses.push({ type: 'audio', audioUri: audioUri });
    }

    // Add text response if available
    if (solutionText) {
      newResponses.push({ type: 'text', text: solutionText });
    }

    // Add image response if available
    if (imageUri) {
      newResponses.push({ type: 'image', imageUri: imageUri });
    }

    setResponses(newResponses); // Store all responses in the state
    setSolutionText(''); // Reset text input after adding the response
    setAudioUri(null); // Reset audio after adding the response
    setImageUri(null); // Reset image after adding the response
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Your Response</Text>

      {/* Query Section */}
      <View style={styles.querySection}>
        <Text style={styles.queryText}>{query}</Text>
      </View>

      {/* Response Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={[styles.button, isRecording ? styles.recordingButton : {}]}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Recording' : 'Record Audio'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsTextVisible(true); // Show text input field when button is clicked
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Text Response</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally show Text Input for written solution */}
      {isTextVisible && (
        <View style={styles.solutionSection}>
          <TextInput
            style={styles.textInput}
            placeholder="Write your solution here"
            value={solutionText}
            onChangeText={setSolutionText}
          />
        </View>
      )}

      {/* Add the response when teacher finishes */}
      <TouchableOpacity onPress={addResponse} style={styles.addResponseButton}>
        <Text style={styles.buttonText}>Submit Response</Text>
      </TouchableOpacity>

      {/* Display Teacher's Responses */}
      <View style={styles.responsesSection}>
        {responses.map((response, index) => {
          if (response.type === 'audio') {
            return (
              <View key={index} style={styles.response}>
                <Text style={styles.responseText}>Audio response recorded</Text>
                <TouchableOpacity onPress={() => audioRecorderPlayer.startPlayer(response.audioUri)}>
                  <Text style={styles.audioButton}>Listen to Audio</Text>
                </TouchableOpacity>
              </View>
            );
          } else if (response.type === 'text') {
            return (
              <View key={index} style={styles.response}>
                <Text style={styles.responseText}>{response.text}</Text>
              </View>
            );
          } else if (response.type === 'image') {
            return (
              <View key={index} style={styles.response}>
                <Text style={styles.responseText}>Image response:</Text>
                <Image source={{ uri: response.imageUri }} style={styles.image} />
              </View>
            );
          }
          return null;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  querySection: {
    marginBottom: 20,
  },
  queryText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  solutionSection: {
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  addResponseButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  responsesSection: {
    marginTop: 20,
  },
  response: {
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  audioButton: {
    fontSize: 16,
    color: '#007bff',
  },
  image: {
      width: 100,
      height: 100,
      marginTop: 10,
    },
  });

  export default TeacherResponsePage;
