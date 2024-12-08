import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Ensure to install @expo/vector-icons if not already installed
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type StudentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'time table'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'main screen'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};
type FormData = {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
  department: string;
  qualifications: string;
  subjects: string;
  timetable: string;
  profilePhoto: string | null;
};

const RegistrationScreen:React.FC<Props> = ({ navigation }) =>{
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
    } else {
      Alert.alert('Registration Success', `Welcome ${data.name}!`);
    }
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        setProfilePhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Teacher Registration</Text>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        {/* Profile photo upload */}
        <TouchableOpacity onPress={handleImagePick} style={styles.imageInputField}>
          <Text style={styles.imageInputText}>
            {profilePhoto ? 'Change Photo' : 'Upload Photo'}
          </Text>
          {!profilePhoto ? (
            <Ionicons name="camera" size={24} color="#6200EE" />
          ) : (
            <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
          )}
        </TouchableOpacity>

        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={value}
                onChangeText={onChange}
              />
              {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Enter a valid email',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="contact"
          rules={{ required: 'Contact number is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
              />
              {errors.contact && <Text style={styles.error}>{errors.contact.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password should be at least 6 characters' },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{ required: 'Confirm Password is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
              {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
            </>
          )}
        />
      </View>

      {/* Educational Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Educational Details</Text>

        <Controller
          control={control}
          name="department"
          rules={{ required: 'Department is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Department"
                value={value}
                onChangeText={onChange}
              />
              {errors.department && <Text style={styles.error}>{errors.department.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="qualifications"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Qualifications"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="subjects"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Subjects"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="timetable"
          render={({ field: { onChange, value } }) => (
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => navigation.navigate('Timetable')}
            >
              <Ionicons name="calendar" size={24} color="#6200EE" style={styles.calendarIcon} />
              <Text style={styles.calendarButtonText}>
                {value ? `Selected: ${value}` : 'Confirm your time table'}
              </Text>
            </TouchableOpacity>
          )}
        />


      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton}  onPress={() => navigation.navigate('Mainpage')}>
        <Text style={styles.registerButtonText} >Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,

    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200EE',
  },
  section: {
    marginBottom: 25,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6200EE',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  imageInputField: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageInputText: {
    fontSize: 16,
    color: '#6200EE',
    marginRight: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#6200EE',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarButton: {
    flexDirection: 'row', // Align icon and text side by side
    alignItems: 'center', // Vertically align items
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  calendarIcon: {
    marginRight: 10, // Add space between icon and text
  },
  calendarButtonText: {
    fontSize: 16,
    color: '#6200EE',
  },

});

export default RegistrationScreen;
