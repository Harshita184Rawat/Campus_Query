import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';

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

const RegistrationStudent = () => {
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Registration</Text>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        {/* Profile photo upload */}
                  <TouchableOpacity onPress={handleImagePick} style={styles.imageUpload}>
                    <Text style={styles.uploadText}>Upload Profile Photo</Text>
                  </TouchableOpacity>
            {profilePhoto && <Image source={{ uri: profilePhoto }} style={styles.profileImage} />}


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
          rules={{ required: 'Email is required', pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ }}
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
          rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password should be at least 6 characters' } }}
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
            <TextInput
              style={styles.input}
              placeholder="Available Time Table"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <Button title="Register" onPress={handleSubmit(onSubmit)} color={'#6200EE'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 80,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#6200EE'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  imageUpload: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 4,
    marginBottom: 10,
  },
  uploadText: {
    color: '#fff',
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
}); // <-- Ensure this bracket closes here

export default RegistrationStudent;
